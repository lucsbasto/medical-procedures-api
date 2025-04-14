import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GenerateDeniedReportByPeriodInputDto {
  @ApiProperty({
    description: 'Data de início do relatório.',
    example: '2025-04-01T00:00:00.000Z',
  })
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @ApiProperty({
    description: 'Data de fim do relatório.',
    example: '2025-04-14T23:59:59.999Z',
  })
  @IsDate()
  @Type(() => Date)
  endDate: Date;
}
