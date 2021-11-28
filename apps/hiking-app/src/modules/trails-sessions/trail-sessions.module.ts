import { Module } from '@nestjs/common';

import { HikingDatabasesModule } from '@apps/hiking-app/modules/databases/databases.module';

import { JoinTrailSessionService } from './services/join-trail-session.service';
import { TrailsSessionsService } from './services/trail-sessions.service';
import { UsersService } from './services/users.service';
import { TrailsSessionsController } from './trail-sessions.controller';

@Module({
  imports: [HikingDatabasesModule],
  controllers: [TrailsSessionsController],
  providers: [TrailsSessionsService, JoinTrailSessionService, UsersService],
})
export class TrailsSessionsModule {}
