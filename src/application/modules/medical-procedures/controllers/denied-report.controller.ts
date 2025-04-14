import { GenerateDeniedReportByPeriodUseCase } from '@/domain/medical-procedure/usecases/generate-denied-report-by-period/generate-denied-report-by-period.use-case';
import { Controller, Get, InternalServerErrorException, Query, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GenerateDeniedReportByPeriodInputDto } from './dtos/generate-denied-report-by-period-input.dto';
import { GenerateDeniedReportByPeriodOutputDto } from './dtos/generate-denied-report-by-period-output.dto';

@ApiTags('Reports')
@Controller('reports/denied')
export class DeniedReportController {
  constructor(private readonly generateDeniedReportByPeriodUseCase: GenerateDeniedReportByPeriodUseCase) {}

  @Get()
  @ApiOkResponse({
    description: 'Relatório de procedimentos negados por período gerado com sucesso.',
    type: [GenerateDeniedReportByPeriodOutputDto],
  })
  @ApiBadRequestResponse({ description: 'Dados de requisição inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor ao gerar o relatório.' })
  async getDeniedReport(
    @Query(new ValidationPipe({ transform: true })) query: GenerateDeniedReportByPeriodInputDto,
  ): Promise<GenerateDeniedReportByPeriodOutputDto[]> {
    try {
      return await this.generateDeniedReportByPeriodUseCase.execute(query);
    } catch (error) {
      console.error('Erro ao gerar relatório de procedimentos negados:', error);
      throw new InternalServerErrorException('Erro ao gerar relatório de procedimentos negados.');
    }
  }
}
