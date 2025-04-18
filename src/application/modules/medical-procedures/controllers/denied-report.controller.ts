import { Role } from '@/common/enums/role.enum';
import { ILoggerService } from '@/domain/interfaces/common/logger';
import { GenerateDeniedReportByPeriodUseCaseInterface } from '@/domain/medical-procedure/usecases/generate-denied-report-by-period/generate-denied-report-by-period.use-case.interface';
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
import { GenerateDeniedReportByPeriodInputDto } from './dtos/generate-denied-report-by-period-input.dto';
import { GenerateDeniedReportByPeriodOutputDto } from './dtos/generate-denied-report-by-period-output.dto';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports/denied')
export class DeniedReportController {
  constructor(
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
    @Inject('GenerateDeniedReportByPeriodUseCaseInterface')
    private readonly generateDeniedReportByPeriodUseCase: GenerateDeniedReportByPeriodUseCaseInterface,
  ) {
    this.loggerService.setContext(DeniedReportController.name);
  }

  @Get()
  @Roles(Role.SUPPORT, Role.DOCTOR, Role.ADMIN)
  @ApiOkResponse({
    description: 'Relatório de procedimentos negados por período gerado com sucesso.',
    type: [GenerateDeniedReportByPeriodOutputDto],
  })
  @ApiBadRequestResponse({ description: 'Dados de requisição inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor ao gerar o relatório.' })
  async getDeniedReport(
    @Query(new ValidationPipe({ transform: true })) query: GenerateDeniedReportByPeriodInputDto,
  ): Promise<GenerateDeniedReportByPeriodOutputDto[]> {
    this.loggerService.info(`getDeniedReport - ${JSON.stringify(query)}`);
    return await this.generateDeniedReportByPeriodUseCase.execute(query);
  }
}
