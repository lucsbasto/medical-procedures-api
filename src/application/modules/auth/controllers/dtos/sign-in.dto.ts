import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'O nome de usuário para autenticação.',
    example: 'john.doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'A senha para autenticação.',
    example: 'securePassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
