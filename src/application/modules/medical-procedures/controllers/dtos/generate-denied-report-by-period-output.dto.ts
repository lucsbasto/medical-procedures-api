import { ApiProperty } from '@nestjs/swagger';

export class GenerateDeniedReportByPeriodOutputDto {
  @ApiProperty({ description: 'ID do procedimento negado.' })
  id: string;

  @ApiProperty({ description: 'ID do médico responsável.' })
  doctorId: string;

  @ApiProperty({ description: 'Nome do médico responsável.' })
  doctorName: string;

  @ApiProperty({ description: 'ID do paciente.' })
  patientId: string;

  @ApiProperty({ description: 'Nome do procedimento.' })
  procedureName: string;

  @ApiProperty({ description: 'Data do procedimento.' })
  procedureDate: Date;

  @ApiProperty({ description: 'Valor do procedimento.' })
  procedureValue: number;

  @ApiProperty({ nullable: true, description: 'Motivo da glossa.' })
  denialReason: string | null;
}
