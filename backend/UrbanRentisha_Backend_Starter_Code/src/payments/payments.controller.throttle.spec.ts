import { ExecutionContext, INestApplication } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import * as request from "supertest";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

/**
 * A real, HTTP-level integration test (not just metadata inspection) that
 * the stricter @Throttle(FINANCIAL_MUTATION_THROTTLE) on
 * PaymentsController.confirm actually takes effect ahead of the module's
 * own (more generous) global default, by wiring up a minimal app with the
 * real ThrottlerGuard as APP_GUARD - mirroring the production wiring in
 * app.module.ts - and a stubbed JwtAuthGuard so requests don't need a real
 * JWT.
 */
describe("PaymentsController financial-mutation throttling (integration)", () => {
  let app: INestApplication;
  let paymentsService: { confirm: jest.Mock };

  beforeAll(async () => {
    paymentsService = {
      confirm: jest.fn().mockResolvedValue({ id: "payment-1" }),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot([{ name: "default", ttl: 60_000, limit: 60 }]),
      ],
      controllers: [PaymentsController],
      providers: [
        { provide: PaymentsService, useValue: paymentsService },
        { provide: APP_GUARD, useClass: ThrottlerGuard },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (ctx: ExecutionContext) => {
          ctx.switchToHttp().getRequest().user = {
            sub: "tenant-1",
            role: "TENANT",
          };
          return true;
        },
      })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("blocks the 11th request within a minute, well below the module's 60/min global default", async () => {
    const agent = request(app.getHttpServer());
    const body = { paymentId: "payment-1", txHash: "tx-1" };

    for (let i = 0; i < 10; i += 1) {
      const res = await agent.post("/payments/confirm").send(body);
      expect(res.status).not.toBe(429);
    }

    const blocked = await agent.post("/payments/confirm").send(body);
    expect(blocked.status).toBe(429);
    expect(paymentsService.confirm).toHaveBeenCalledTimes(10);
  });
});
