import { GenerateFinancialReportByDoctorUseCase } from '@/domain/medical-procedure/usecases/generate-financial-report-by-doctor/generate-financial-report-by-doctor.use-case';
import { Controller, Get, InternalServerErrorException, Query, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GenerateFinancialReportByDoctorInputDto } from './dtos/generate-financial-report-by-doctor-input.dto';
import { GenerateFinancialReportByDoctorOutputDto } from './dtos/generate-financial-report-by-doctor-output.dto';

@ApiTags('Reports')
@Controller('reports/financial')
export class FinancialReportController {
  constructor(private readonly generateFinancialReportByDoctorUseCase: GenerateFinancialReportByDoctorUseCase) {}

  @Get()
  @ApiOkResponse({
    description: 'Relatório financeiro por médico gerado com sucesso.',
    type: [GenerateFinancialReportByDoctorOutputDto],
  })
  @ApiBadRequestResponse({ description: 'Dados de requisição inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor ao gerar o relatório.' })
  async getFinancialReport(
    @Query(new ValidationPipe({ transform: true })) query: GenerateFinancialReportByDoctorInputDto,
  ): Promise<GenerateFinancialReportByDoctorOutputDto[]> {
    try {
      return await this.generateFinancialReportByDoctorUseCase.execute(query);
    } catch (error) {
      console.error('Erro ao gerar relatório financeiro por médico:', error);
      throw new InternalServerErrorException('Erro ao gerar relatório financeiro por médico.');
    }
  }
}
