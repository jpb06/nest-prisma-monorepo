import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

import { HikingRepositoryService } from '../databases/repositories/hiking-repository.service';
import { TrailDto } from './dto/trail.dto';

@Injectable()
export class TrailsService {
  constructor(private readonly hiking: HikingRepositoryService) {}

  getTrails = (): Observable<Array<TrailDto>> =>
    this.hiking.getTrails().pipe(map((o) => plainToClass(TrailDto, o)));
}