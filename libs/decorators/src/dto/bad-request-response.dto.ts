import { ApiProperty } from '@nestjs/swagger';

export class BadRequestDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({
    oneOf: [
      { type: 'string' },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  })
  message: string | [string];

  @ApiProperty()
  error: string;
}
