import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class GenerateFinancialReportByDoctorInputDto {
  @ApiProperty({ description: 'Data de início do relatório.' })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({ description: 'Data de fim do relatório.' })
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @ApiProperty({ required: false, description: 'ID do médico para filtrar o relatório (opcional).' })
  @IsOptional()
  @IsString()
  doctorId?: string;
}
