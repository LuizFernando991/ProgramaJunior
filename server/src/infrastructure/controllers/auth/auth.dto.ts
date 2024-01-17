import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MaxLength(40)
  name: string

  @IsString()
  @MinLength(8)
  password: string
}
