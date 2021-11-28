import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { ApiRoute } from '@libs/decorators';

import { JoinTrailSessionBodyDto } from './dto/join-trail-session.body.dto';
import { TrailSessionResponseDto } from './dto/trail-session.response.dto';
import { JoinTrailSessionService } from './services/join-trail-session.service';
import { TrailsSessionsService } from './services/trail-sessions.service';

@Controller('trails/sessions')
export class TrailsSessionsController {
  constructor(
    private readonly trailsSessions: TrailsSessionsService,
    private readonly join: JoinTrailSessionService,
  ) {}

  @Get()
  @ApiRoute({
    description: 'Trail sessions',
    summary: 'Gets all the trail sessions',
    ok: {
      description: 'The sessions',
      type: [TrailSessionResponseDto],
    },
  })
  getSessions(): Observable<Array<TrailSessionResponseDto>> {
    return this.trailsSessions.getSessions();
  }

  @Post(':id/join')
  @ApiRoute({
    description: 'Join a group of hikers for a trail session',
    summary: 'Participate to a trail session',
    ok: {
      description: 'The sessions',
      type: TrailSessionResponseDto,
    },
  })
  joinSession(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() { idDev }: JoinTrailSessionBodyDto,
  ): Observable<TrailSessionResponseDto> {
    return this.join.joinSession(id, idDev);
  }
}
