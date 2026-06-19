import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ListingsModule } from "./listings/listings.module";
import { ViewingRequestsModule } from "./viewing-requests/viewing-requests.module";
import { PaymentsModule } from "./payments/payments.module";
import { StellarModule } from "./stellar/stellar.module";
import { ZkProofsModule } from "./zk-proofs/zk-proofs.module";
import { ProofVerificationModule } from "./proof-verification/proof-verification.module";
import { ViewingCodesModule } from "./viewing-codes/viewing-codes.module";
import { ReportsModule } from "./reports/reports.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AuditLogsModule } from "./audit-logs/audit-logs.module";
import { ExternalApiModule } from "./external-api/external-api.module";
import { WebhooksModule } from "./webhooks/webhooks.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ListingsModule,
    ViewingRequestsModule,
    PaymentsModule,
    StellarModule,
    ZkProofsModule,
    ProofVerificationModule,
    ViewingCodesModule,
    ReportsModule,
    NotificationsModule,
    AuditLogsModule,
    ExternalApiModule,
    WebhooksModule,
    AdminModule,
  ],
})
export class AppModule {}
