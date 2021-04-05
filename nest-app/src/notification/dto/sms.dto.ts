import { ApiProperty } from '@nestjs/swagger';

export class SMSDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;
}
