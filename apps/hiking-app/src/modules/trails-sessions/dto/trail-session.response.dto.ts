import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { TrailDto } from '../../trails/dto/trail.dto';
import { UserDto } from './user.dto';

@Exclude()
export class TrailSessionResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  date: string;

  @Expose()
  @ApiProperty()
  @Type(() => TrailDto)
  trail: TrailDto;

  @Expose()
  @ApiProperty({ isArray: true, type: UserDto })
  @Type(() => UserDto)
  hikers: UserDto[];
}
