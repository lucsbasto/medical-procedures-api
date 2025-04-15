import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'The username of the user. Must be unique and not empty.',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of the user. Must be strong and not empty.',
    example: 'StrongPassword123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'The email of the user. Must be a valid email address and not empty.',
    example: 'johndoe@example.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
