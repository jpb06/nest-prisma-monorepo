import { HikingDatabaseClient, UsersDatabaseClient } from '@libs/databases';

export const externalDatabasesClients = [
  UsersDatabaseClient,
  HikingDatabaseClient,
];
