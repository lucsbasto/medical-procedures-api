import { ApiProperty } from '@nestjs/swagger';

export class DoctorResponseDto {
  @ApiProperty({ description: 'ID único do médico (UUID).' })
  id: string;

  @ApiProperty({ description: 'Nome completo do médico.' })
  name: string;

  @ApiProperty({ description: 'Número do CRM do médico.' })
  crm: string;

  @ApiProperty({ description: 'Especialidade do médico.' })
  specialty: string;
}
