import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ListingsModule } from "./listings/listings.module";
import { ViewingRequestsModule } from "./viewing-requests/viewing-requests.module";
import { PaymentsModule } from "./payments/payments.module";
import { StellarModule } from "./stellar/stellar.module";
import { SorobanModule } from "./soroban/soroban.module";
import { ZkProofsModule } from "./zk-proofs/zk-proofs.module";
import { ProofVerificationModule } from "./proof-verification/proof-verification.module";
import { ViewingCodesModule } from "./viewing-codes/viewing-codes.module";
import { ReportsModule } from "./reports/reports.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AuditLogsModule } from "./audit-logs/audit-logs.module";
import { ExternalApiModule } from "./external-api/external-api.module";
import { WebhooksModule } from "./webhooks/webhooks.module";
import { AdminModule } from "./admin/admin.module";
import { AgentsModule } from "./agents/agents.module";
import { MessagesModule } from "./messages/messages.module";
import { StorageModule } from "./storage/storage.module";
import { UploadsModule } from "./uploads/uploads.module";
import { LandlordModule } from "./landlord/landlord.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { ListingThreadsModule } from "./listing-threads/listing-threads.module";
import { RealtimeModule } from "./realtime/realtime.module";
import { SupportModule } from "./support/support.module";
import { EscrowReportingModule } from "./escrow-reporting/escrow-reporting.module";
import { ReconciliationModule } from "./reconciliation/reconciliation.module";
import { HealthModule } from "./health/health.module";
import { validateEnv } from "./config/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    ScheduleModule.forRoot(),
    // Generous global default (60 req/min) - tighter per-route limits (e.g.
    // login/register) are applied with @Throttle() where brute-forcing is
    // an actual risk, per src/auth/auth.controller.ts.
    ThrottlerModule.forRoot([{ name: "default", ttl: 60_000, limit: 60 }]),
    RealtimeModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    ListingsModule,
    ViewingRequestsModule,
    PaymentsModule,
    StellarModule,
    SorobanModule,
    ZkProofsModule,
    ProofVerificationModule,
    ViewingCodesModule,
    ReportsModule,
    NotificationsModule,
    AuditLogsModule,
    ExternalApiModule,
    WebhooksModule,
    AdminModule,
    AgentsModule,
    MessagesModule,
    StorageModule,
    UploadsModule,
    LandlordModule,
    ReviewsModule,
    ListingThreadsModule,
    SupportModule,
    EscrowReportingModule,
    ReconciliationModule,
    HealthModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
