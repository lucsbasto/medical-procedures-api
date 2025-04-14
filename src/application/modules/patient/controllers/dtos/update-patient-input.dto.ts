import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdatePatientInputDto {
  @ApiProperty({
    description: 'Nome completo do paciente (opcional).',
    example: 'Maria Souza',
    minLength: 3,
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O nome do paciente deve ser uma string.' })
  @Length(3, 255, { message: 'O nome do paciente deve ter entre 3 e 255 caracteres.' })
  name?: string;

  @ApiProperty({
    description: 'Número de telefone do paciente (opcional).',
    example: '63888888888',
    minLength: 8,
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O telefone do paciente deve ser uma string.' })
  @Length(8, 20, { message: 'O telefone do paciente deve ter entre 8 e 20 caracteres.' })
  phone?: string;

  @ApiProperty({
    description: 'Email do paciente (opcional).',
    example: 'maria.souza@email.com',
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'O email do paciente deve ser uma string.' })
  @Length(0, 255, { message: 'O email do paciente deve ter no máximo 255 caracteres.' })
  email?: string;
}
