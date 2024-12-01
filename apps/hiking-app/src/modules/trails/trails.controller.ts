import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { ApiRoute } from '@libs/decorators';

import { TrailDto } from './dto/trail.dto';
import { TrailsService } from './trails.service';

@Controller('trails')
export class TrailController {
  constructor(private readonly service: TrailsService) {}

  @Get()
  @ApiRoute({
    description: 'Trails',
    summary: 'Gets all the availables trails',
    ok: {
      description: 'The trails',
      type: [TrailDto],
    },
  })
  getTrails(): Observable<TrailDto[]> {
    return this.service.getTrails();
  }
}
