import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateDoctorDto {
  @ApiProperty({
    description: 'Novo nome completo do médico (opcional).',
    example: 'Dr. João da Silva',
    minLength: 3,
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'O nome do médico deve ser uma string.' })
  @Length(3, 255, { message: 'O nome do médico deve ter entre 3 e 255 caracteres.' })
  name?: string;

  @ApiProperty({
    description: 'Novo número do CRM do médico (opcional).',
    example: 'CRM-67890-RJ',
    minLength: 5,
    maxLength: 20,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.replace(/[^a-zA-Z0-9]/g, '') : value))
  @IsString({ message: 'O CRM do médico deve ser uma string.' })
  @Length(5, 20, { message: 'O CRM do médico deve ter entre 5 e 20 caracteres.' })
  crm?: string;

  @ApiProperty({
    description: 'Nova especialidade do médico (opcional).',
    example: 'Dermatologia',
    minLength: 3,
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A especialidade do médico deve ser uma string.' })
  @Length(3, 100, { message: 'A especialidade do médico deve ter entre 3 e 100 caracteres.' })
  specialty?: string;
}
