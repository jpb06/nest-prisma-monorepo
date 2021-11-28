import { Module } from '@nestjs/common';

import { HikingDatabasesModule } from './databases/databases.module';
import { TrailsSessionsModule } from './trails-sessions/trail-sessions.module';
import { TrailsModule } from './trails/trails.module';

@Module({
  imports: [HikingDatabasesModule, TrailsModule, TrailsSessionsModule],
})
export class AppModule {}
