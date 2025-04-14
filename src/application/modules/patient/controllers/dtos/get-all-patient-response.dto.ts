import { ApiProperty } from '@nestjs/swagger';

export class GetAllPatientResponseDto {
  @ApiProperty({
    description: 'ID único do paciente.',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  id: string;

  @ApiProperty({
    description: 'Nome completo do paciente.',
    example: 'João da Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Número de telefone do paciente.',
    example: '63999999999',
  })
  phone: string;

  @ApiProperty({
    description: 'Email do paciente (opcional).',
    example: 'joao.silva@email.com',
    required: false,
  })
  email?: string;
}
