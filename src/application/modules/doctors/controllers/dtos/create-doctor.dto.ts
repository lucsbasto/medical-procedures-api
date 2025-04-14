import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    description: 'Nome completo do médico.',
    example: 'Dr. João Silva',
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'O nome do médico é obrigatório.' })
  @IsString({ message: 'O nome do médico deve ser uma string.' })
  @Length(3, 255, { message: 'O nome do médico deve ter entre 3 e 255 caracteres.' })
  name: string;

  @ApiProperty({
    description:
      'Número do CRM do médico (ex: SP-12345). Caracteres especiais e espaços serão removidos antes da validação.',
    example: 'SP-12345',
    minLength: 5,
    maxLength: 20,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.replace(/[^a-zA-Z0-9-]/g, '').toUpperCase() : value))
  @IsNotEmpty({ message: 'O CRM do médico é obrigatório.' })
  @IsString({ message: 'O CRM do médico deve ser uma string.' })
  @Length(5, 20, { message: 'O CRM do médico deve ter entre 5 e 20 caracteres.' })
  @Matches(/^[A-Z]{2}-[0-9]+$/, {
    message:
      'O CRM deve seguir o formato: duas letras maiúsculas do estado, um hífen e o número de registro (ex: SP-12345).',
  })
  crm: string;

  @ApiProperty({
    description: 'Especialidade do médico.',
    example: 'Cardiologia',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'A especialidade do médico é obrigatória.' })
  @IsString({ message: 'A especialidade do médico deve ser uma string.' })
  @Length(3, 100, { message: 'A especialidade do médico deve ter entre 3 e 100 caracteres.' })
  specialty: string;

  @ApiProperty({
    description: 'Número de telefone do doutor.',
    example: '63999999999',
    minLength: 8,
    maxLength: 20,
  })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value))
  @IsString({ message: 'O telefone do doutor deve ser uma string.' })
  @Length(8, 20, { message: 'O telefone do doutor deve ter entre 8 e 20 caracteres.' })
  phone?: string;

  @ApiProperty({
    description: 'Email do doutor (opcional).',
    example: 'joao.silva@email.com',
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'O email do doutor deve ser um endereço de email válido.' })
  @Length(0, 255, { message: 'O email do doutor deve ter no máximo 255 caracteres.' })
  email?: string;
}
