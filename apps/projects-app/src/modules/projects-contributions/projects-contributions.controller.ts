import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ApiRoute } from '@libs/decorators';
import { ParseIdPipe } from '@libs/pipes';

import { ProjectContributionsDto } from './dto/project-contributions.response.dto';
import { ProjectsContributionsService } from './projects-contributions.service';

@Controller('projects')
export class ProjectsContributionsController {
  constructor(private readonly service: ProjectsContributionsService) {}

  @Get(':id/contributions')
  @ApiRoute({
    description: 'Projects contributions',
    summary: 'Gets all the contributions made to a project',
    ok: {
      description: 'The project contributions',
      type: ProjectContributionsDto,
    },
    badRequest: {},
  })
  getProjectContributions(
    @Param(
      'id',
      new ParseIdPipe('Expecting an integer as param for trail session id'),
    )
    id: number,
  ): Observable<Array<ProjectContributionsDto>> {
    return this.service.getProjectContributions(id);
  }
}
