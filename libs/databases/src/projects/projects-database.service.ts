import { Injectable } from '@nestjs/common';

import { ProjectsDatabaseClient } from './projects-database.client';

@Injectable()
export class ProjectsDatabaseService {
  constructor(protected readonly projectsDB: ProjectsDatabaseClient) {}
}
