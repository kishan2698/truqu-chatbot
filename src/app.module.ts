import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingController } from './greeting/greeting.controller';
import { GreetingService } from './greeting/greeting.service';
import { FeedbackService } from './feedback/feedback.service';
import { GoalService } from './goal/goal.service';
import { ReflectionService } from './reflection/reflection.service';
import { UserSessionService } from './user-session/user-session.service';
import { ActionHelperService } from './action-helper/action-helper.service';
import { LatestFeedBackService } from './latest-feed-back/latest-feed-back.service';
import { ContactSupportService } from './contact-support/contact-support.service';

@Module({
  imports: [],
  controllers: [AppController, GreetingController],
  providers: [AppService, GreetingService, FeedbackService, GoalService, ReflectionService, UserSessionService, ActionHelperService, LatestFeedBackService, ContactSupportService],
})
export class AppModule {}
