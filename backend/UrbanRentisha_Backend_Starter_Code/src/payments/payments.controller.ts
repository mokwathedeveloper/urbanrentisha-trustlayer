import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import {
  FINANCIAL_MUTATION_THROTTLE,
  PAYMENT_POLL_THROTTLE,
} from "../common/constants/throttle-limits";
import { CreatePaymentIntentDto } from "./dto/create-payment-intent.dto";
import { ConfirmPaymentDto } from "./dto/confirm-payment.dto";
import { PrepareEscrowDepositDto } from "./dto/prepare-escrow-deposit.dto";
import { ConfirmEscrowDepositDto } from "./dto/confirm-escrow-deposit.dto";
import { PaymentsService } from "./payments.service";

@UseGuards(JwtAuthGuard)
@Controller("payments")
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post("create")
  createIntent(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreatePaymentIntentDto,
  ) {
    return this.payments.createIntent(user.sub, user.role, dto);
  }

  @Throttle(FINANCIAL_MUTATION_THROTTLE)
  @Post("confirm")
  confirm(@CurrentUser() user: AuthUser, @Body() dto: ConfirmPaymentDto) {
    return this.payments.confirm(user.sub, user.role, dto);
  }

  @Throttle(PAYMENT_POLL_THROTTLE)
  @Get(":id/poll")
  pollStatus(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.payments.pollStatus(user.sub, user.role, id);
  }

  @Throttle(FINANCIAL_MUTATION_THROTTLE)
  @Post(":id/pay-now")
  payNow(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.payments.payNow(user.sub, user.role, id);
  }

  @Throttle(FINANCIAL_MUTATION_THROTTLE)
  @Post(":id/escrow/prepare-deposit")
  prepareEscrowDeposit(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body() dto: PrepareEscrowDepositDto,
  ) {
    return this.payments.prepareEscrowDeposit(user.sub, user.role, id, dto);
  }

  @Throttle(FINANCIAL_MUTATION_THROTTLE)
  @Post(":id/escrow/confirm-deposit")
  confirmEscrowDeposit(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body() dto: ConfirmEscrowDepositDto,
  ) {
    return this.payments.confirmEscrowDeposit(user.sub, user.role, id, dto);
  }

  @Get(":id")
  findOne(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.payments.findOne(id, user.sub, user.role);
  }
}
