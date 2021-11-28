import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class JoinTrailSessionBodyDto {
  @ApiProperty()
  @IsInt()
  idDev: number;
}
