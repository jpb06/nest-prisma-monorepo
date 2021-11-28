import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ApiRoute } from '@libs/decorators';

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
  })
  getProjectContributions(
    @Param('id', new ParseIntPipe()) id: number,
  ): Observable<Array<ProjectContributionsDto>> {
    return this.service.getProjectContributions(id);
  }
}
