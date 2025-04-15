import { Role } from '@/common/enums/role.enum';
import { ILoggerService } from '@/domain/interfaces/common/logger';
import { GenerateFinancialReportByDoctorUseCaseInterface } from '@/domain/medical-procedure/usecases/generate-financial-report-by-doctor/generate-financial-report-by-doctor.use-case.interface';
import { Controller, Get, Inject, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { GenerateFinancialReportByDoctorInputDto } from './dtos/generate-financial-report-by-doctor-input.dto';
import { GenerateFinancialReportByDoctorOutputDto } from './dtos/generate-financial-report-by-doctor-output.dto';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles(Role.SUPPORT, Role.DOCTOR, Role.ADMIN)
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
