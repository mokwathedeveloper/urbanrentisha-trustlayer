import { Module } from "@nestjs/common";
import {
  ListingThreadsController,
  ListingThreadMessagesController,
} from "./listing-threads.controller";
import { ListingThreadsService } from "./listing-threads.service";
import { NotificationsModule } from "../notifications/notifications.module";
import { RealtimeModule } from "../realtime/realtime.module";

@Module({
  imports: [NotificationsModule, RealtimeModule],
  controllers: [ListingThreadsController, ListingThreadMessagesController],
  providers: [ListingThreadsService],
  exports: [ListingThreadsService],
})
export class ListingThreadsModule {}
