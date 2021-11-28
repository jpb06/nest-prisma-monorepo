import { Module } from '@nestjs/common';

import { UsersDatabaseClient } from '@libs/databases';

import { externalDatabasesClients } from './external-databases-clients';
import { HikingRepositoryService } from './repositories/hiking-repository.service';
import { UsersRepositoryService } from './repositories/users-repository.service';

@Module({
  providers: [
    ...externalDatabasesClients,
    UsersRepositoryService,
    HikingRepositoryService,
  ],
  exports: [
    UsersRepositoryService,
    HikingRepositoryService,
    UsersDatabaseClient,
  ],
})
export class HikingDatabasesModule {}
