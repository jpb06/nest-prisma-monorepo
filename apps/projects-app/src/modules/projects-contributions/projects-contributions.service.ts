import { Injectable } from '@nestjs/common';
import { User } from '@prisma/db-users';
import { plainToInstance } from 'class-transformer';
import {
  distinct,
  from,
  map,
  mergeAll,
  mergeMap,
  Observable,
  of,
  single,
  toArray,
} from 'rxjs';

import { ProjectsRepositoryService } from '../databases/repositories/projects-repository.service';
import { UsersRepositoryService } from '../databases/repositories/users-repository.service';
import { ContributionSelectType } from '../databases/selects/contributions.select';
import { ProjectContributionsDto } from './dto/project-contributions.response.dto';

@Injectable()
export class ProjectsContributionsService {
  constructor(
    private readonly projects: ProjectsRepositoryService,
    private readonly users: UsersRepositoryService,
  ) {}

  getProjectContributions = (
    idProject: number,
  ): Observable<Array<ProjectContributionsDto>> => {
    const contributions$ = this.projects.getProjectContributions(idProject);

    return contributions$.pipe(
      mergeMap((contributions) => {
        const users$ = this.getUsersFor(contributions);

        return from(contributions).pipe(
          map((contrib) =>
            users$.pipe(
              mergeMap((l) => l),
              single((u) => u.id === contrib.idDev),
              map((dev) => ({
                id: contrib.id,
                date: contrib.date,
                dev,
                repo: contrib.Repo,
              })),
              map((o) => plainToInstance(ProjectContributionsDto, o)),
            ),
          ),
          mergeAll(),
          toArray(),
        );
      }),
    );
  };

  private getUsersFor = (
    contributions: ContributionSelectType[],
  ): Observable<Array<User>> =>
    of(contributions.map((el) => el.idDev))
      .pipe(distinct())
      .pipe(mergeMap(this.users.getBy));
}
