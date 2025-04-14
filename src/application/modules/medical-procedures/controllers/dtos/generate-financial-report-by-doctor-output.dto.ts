import { ApiProperty } from '@nestjs/swagger';

export class GenerateFinancialReportByDoctorOutputDto {
  @ApiProperty({ description: 'ID do médico.' })
  doctorId: string;

  @ApiProperty({ required: false, description: 'Nome do médico (opcional).' })
  doctorName?: string;

  @ApiProperty({ description: 'Valor total dos procedimentos pagos.' })
  totalPaid: number;

  @ApiProperty({ description: 'Valor total dos procedimentos pendentes.' })
  totalPending: number;

  @ApiProperty({ description: 'Valor total dos procedimentos negados.' })
  totalDenied: number;
}
