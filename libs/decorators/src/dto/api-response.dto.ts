import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: Array<string> | string;
}
