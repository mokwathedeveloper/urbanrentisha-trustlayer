import { Test } from "@nestjs/testing";
import { AuditLogsService } from "./audit-logs.service";
import { PrismaService } from "../prisma/prisma.service";
import { runWithRequestId } from "../common/context/request-context";

describe("AuditLogsService.create", () => {
  let service: AuditLogsService;
  let prisma: { auditLog: { create: jest.Mock } };

  beforeEach(async () => {
    prisma = { auditLog: { create: jest.fn().mockResolvedValue({}) } };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuditLogsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = moduleRef.get(AuditLogsService);
  });

  it("stamps the current request's correlation ID into metadata when called inside a request context", async () => {
    await runWithRequestId("req-correlated", () =>
      service.create({
        actorId: "actor-1",
        action: "payment.escrow_released",
        entityType: "payment",
        entityId: "payment-1",
        metadata: { releaseTxHash: "tx-1" },
      }),
    );

    expect(prisma.auditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        metadata: { releaseTxHash: "tx-1", requestId: "req-correlated" },
      }),
    });
  });

  it("writes no requestId field at all when called outside any request context (e.g. a cron job)", async () => {
    await service.create({
      action: "payment.reconciliation_deposit_repaired",
      entityType: "payment",
      entityId: "payment-1",
      metadata: { reason: "stale" },
    });

    const [[call]] = prisma.auditLog.create.mock.calls;
    expect(call.data.metadata).toEqual({ reason: "stale" });
    expect(call.data.metadata).not.toHaveProperty("requestId");
  });

  it("does not let one request's correlation ID leak into a different, concurrent request's audit log", async () => {
    await Promise.all([
      runWithRequestId("req-a", () =>
        service.create({ action: "a", entityType: "x" }),
      ),
      runWithRequestId("req-b", () =>
        service.create({ action: "b", entityType: "x" }),
      ),
    ]);

    const metadataByAction = new Map(
      prisma.auditLog.create.mock.calls.map(([call]) => [
        call.data.action,
        call.data.metadata,
      ]),
    );
    expect(metadataByAction.get("a")).toEqual({ requestId: "req-a" });
    expect(metadataByAction.get("b")).toEqual({ requestId: "req-b" });
  });
});
