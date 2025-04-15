import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInResponseDto {
  @ApiProperty({
    description: 'O token de acesso gerado após o registro bem-sucedido.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Sfl11xZ9zSaY-yXvVzX-zXvVzX-zXvVzX-zXvVzXv',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
