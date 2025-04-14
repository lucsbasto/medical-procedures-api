import { ILoggerService } from '@/domain/interfaces/common/logger';
import { GenerateFinancialReportByDoctorUseCaseInterface } from '@/domain/medical-procedure/usecases/generate-financial-report-by-doctor/generate-financial-report-by-doctor.use-case.interface';
import { Controller, Get, Inject, Query, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GenerateFinancialReportByDoctorInputDto } from './dtos/generate-financial-report-by-doctor-input.dto';
import { GenerateFinancialReportByDoctorOutputDto } from './dtos/generate-financial-report-by-doctor-output.dto';

@ApiTags('Reports')
@Controller('reports/financial')
export class FinancialReportController {
  constructor(
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
    @Inject('GenerateFinancialReportByDoctorUseCaseInterface')
    private readonly generateFinancialReportByDoctorUseCase: GenerateFinancialReportByDoctorUseCaseInterface,
  ) {
    this.loggerService.setContext(FinancialReportController.name);
  }

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
    this.loggerService.info(`getFinancialReport - ${JSON.stringify(query)}`);
    return await this.generateFinancialReportByDoctorUseCase.execute(query);
  }
}
