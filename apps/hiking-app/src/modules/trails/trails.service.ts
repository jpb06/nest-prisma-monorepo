import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

import { TrailDto } from './dto/trail.dto';
import { HikingRepositoryService } from '../databases/repositories/hiking-repository.service';

@Injectable()
export class TrailsService {
  constructor(private readonly hiking: HikingRepositoryService) {}

  getTrails = (): Observable<Array<TrailDto>> =>
    this.hiking.getTrails().pipe(map((o) => plainToInstance(TrailDto, o)));
}
