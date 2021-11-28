import { Module } from '@nestjs/common';

import { externalDatabasesClients } from './external-databases-clients';
import { ProjectsRepositoryService } from './repositories/projects-repository.service';
import { UsersRepositoryService } from './repositories/users-repository.service';

@Module({
  providers: [
    ...externalDatabasesClients,
    UsersRepositoryService,
    ProjectsRepositoryService,
  ],
  exports: [UsersRepositoryService, ProjectsRepositoryService],
})
export class ProjectsDatabasesModule {}
