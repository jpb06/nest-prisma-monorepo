import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';

import { ProjectsDatabaseService } from '@libs/databases';

import {
  ContributionSelectType,
  contributionsSelect,
} from '../selects/contributions.select';

@Injectable()
export class ProjectsRepositoryService extends ProjectsDatabaseService {
  getProjectContributions = (
    idProject: number,
  ): Observable<ContributionSelectType[]> =>
    from(
      this.projectsDB.contribution.findMany({
        select: contributionsSelect,
        where: {
          Repo: {
            idProject,
          },
        },
      }),
    );
}
