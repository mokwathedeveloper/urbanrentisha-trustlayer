import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ReviewsService } from "./reviews.service";

@Controller("users/:id/reviews")
export class ReviewsController {
  constructor(private readonly reviews: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @CurrentUser() user: AuthUser,
    @Param("id") targetUserId: string,
    @Body() dto: CreateReviewDto,
  ) {
    this.reviews.assertCanReview(user.role);
    return this.reviews.create(user.sub, targetUserId, dto);
  }

  @Get()
  findForUser(@Param("id") targetUserId: string) {
    return this.reviews.findForUser(targetUserId);
  }
}
