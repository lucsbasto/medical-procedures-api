import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreatePatientInputDto {
  @ApiProperty({
    description: 'Nome completo do paciente.',
    example: 'João da Silva',
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'O nome do paciente é obrigatório.' })
  @IsString({ message: 'O nome do paciente deve ser uma string.' })
  @Length(3, 255, { message: 'O nome do paciente deve ter entre 3 e 255 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'Número de telefone do paciente.',
    example: '63999999999',
    minLength: 8,
    maxLength: 20,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value))
  @IsNotEmpty({ message: 'O telefone do paciente é obrigatório.' })
  @IsString({ message: 'O telefone do paciente deve ser uma string.' })
  @Length(8, 20, { message: 'O telefone do paciente deve ter entre 8 e 20 caracteres.' })
  phone: string;

  @ApiProperty({
    description: 'Email do paciente (opcional).',
    example: 'joao.silva@email.com',
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'O email do paciente deve ser um endereço de email válido.' })
  @Length(0, 255, { message: 'O email do paciente deve ter no máximo 255 caracteres.' })
  email?: string;
}
