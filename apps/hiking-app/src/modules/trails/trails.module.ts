import { Module } from '@nestjs/common';

import { HikingDatabasesModule } from '@apps/hiking-app/modules/databases/databases.module';

import { TrailController } from './trails.controller';
import { TrailsService } from './trails.service';

@Module({
  imports: [HikingDatabasesModule],
  controllers: [TrailController],
  providers: [TrailsService],
})
export class TrailsModule {}
