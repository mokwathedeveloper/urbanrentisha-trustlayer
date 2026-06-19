import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { CreatePaymentIntentDto } from "./dto/create-payment-intent.dto";
import { ConfirmPaymentDto } from "./dto/confirm-payment.dto";
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
    return this.payments.createIntent(user.sub, dto);
  }

  @Post("confirm")
  confirm(@CurrentUser() user: AuthUser, @Body() dto: ConfirmPaymentDto) {
    return this.payments.confirm(user.sub, dto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.payments.findOne(id);
  }
}
