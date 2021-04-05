import { IsEmail, IsUUID, IsOptional } from 'class-validator';

export class GetUserDto {
  @IsOptional()
  name?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsUUID()
  @IsOptional()
  id?: string;
}
