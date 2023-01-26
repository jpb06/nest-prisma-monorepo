import { Module } from '@nestjs/common';

import { ProjectsContributionsController } from './projects-contributions.controller';
import { ProjectsContributionsService } from './projects-contributions.service';
import { ProjectsDatabasesModule } from '../databases/databases.module';

@Module({
  imports: [ProjectsDatabasesModule],
  controllers: [ProjectsContributionsController],
  providers: [ProjectsContributionsService],
})
export class ProjectsContributionsModule {}
