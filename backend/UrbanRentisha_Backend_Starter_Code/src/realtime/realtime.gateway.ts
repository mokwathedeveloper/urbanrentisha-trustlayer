import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthUser } from "../common/types/auth-user.type";

const USER_ROOM = (userId: string) => `user:${userId}`;
const LISTING_ROOM = (listingId: string) => `listing:${listingId}`;

/**
 * Authenticates each socket with the same JWT used for REST requests
 * (passed as `auth.token` on connect, since browsers can't set custom
 * headers on a WebSocket handshake the way they can on fetch/XHR).
 * Unauthenticated or invalid-token connections are dropped immediately.
 */
@WebSocketGateway({
  cors: { credentials: true },
})
export class RealtimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(RealtimeGateway.name);

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  handleConnection(client: Socket) {
    const token =
      client.handshake.auth?.token ??
      client.handshake.headers.authorization?.replace(/^Bearer\s+/i, "");

    if (!token) {
      client.disconnect(true);
      return;
    }

    try {
      const payload = this.jwt.verify<AuthUser>(token, {
        secret: this.config.get<string>("JWT_SECRET") ?? "dev-secret",
      });
      client.data.userId = payload.sub;
      client.join(USER_ROOM(payload.sub));
    } catch {
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.debug(`Socket disconnected: ${client.id}`);
  }

  @SubscribeMessage("listing:subscribe")
  subscribeToListing(
    @MessageBody() listingId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(LISTING_ROOM(listingId));
  }

  @SubscribeMessage("listing:unsubscribe")
  unsubscribeFromListing(
    @MessageBody() listingId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(LISTING_ROOM(listingId));
  }

  emitToUser(userId: string, event: string, payload: unknown) {
    this.server.to(USER_ROOM(userId)).emit(event, payload);
  }

  emitToListing(listingId: string, event: string, payload: unknown) {
    this.server.to(LISTING_ROOM(listingId)).emit(event, payload);
  }
}
