import { Module } from '@nestjs/common';

import { ProjectsDatabasesModule } from './databases/databases.module';
import { ProjectsContributionsModule } from './projects-contributions/projects-contributions.module';

@Module({
  imports: [ProjectsDatabasesModule, ProjectsContributionsModule],
})
export class AppModule {}
