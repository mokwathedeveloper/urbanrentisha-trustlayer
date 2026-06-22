import { Module } from "@nestjs/common";
import {
  ListingThreadsController,
  ListingThreadMessagesController,
} from "./listing-threads.controller";
import { ListingThreadsService } from "./listing-threads.service";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [NotificationsModule],
  controllers: [ListingThreadsController, ListingThreadMessagesController],
  providers: [ListingThreadsService],
  exports: [ListingThreadsService],
})
export class ListingThreadsModule {}
