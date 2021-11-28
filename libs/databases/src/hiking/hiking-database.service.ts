import { Injectable } from '@nestjs/common';

import { HikingDatabaseClient } from './hiking-database.client';

@Injectable()
export class HikingDatabaseService {
  constructor(protected readonly hikingDB: HikingDatabaseClient) {}
}
