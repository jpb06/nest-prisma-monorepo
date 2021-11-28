import { Module } from '@nestjs/common';

import { ProjectsDatabasesModule } from '../databases/databases.module';
import { ProjectsContributionsController } from './projects-contributions.controller';
import { ProjectsContributionsService } from './projects-contributions.service';

@Module({
  imports: [ProjectsDatabasesModule],
  controllers: [ProjectsContributionsController],
  providers: [ProjectsContributionsService],
})
export class ProjectsContributionsModule {}
