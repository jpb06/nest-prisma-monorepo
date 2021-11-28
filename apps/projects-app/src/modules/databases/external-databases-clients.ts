import { ProjectsDatabaseClient, UsersDatabaseClient } from '@libs/databases';

export const externalDatabasesClients = [
  UsersDatabaseClient,
  ProjectsDatabaseClient,
];
