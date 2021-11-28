import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { UserDto } from '@apps/hiking-app/modules/trails-sessions/dto/user.dto';

import { RepoDto } from './repo.dto';

@Exclude()
export class ProjectContributionsDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  date: string;

  @Expose()
  @ApiProperty({ isArray: true, type: UserDto })
  @Type(() => UserDto)
  dev: Array<UserDto>;

  @Expose()
  @ApiProperty()
  @Type(() => RepoDto)
  repo: RepoDto;
}
