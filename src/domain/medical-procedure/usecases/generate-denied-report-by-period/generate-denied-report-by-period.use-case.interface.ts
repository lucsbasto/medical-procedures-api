import { GenerateDeniedReportByPeriodInputDto } from '../dtos/generate-denied-report-by-period-input.dto';
import { GenerateDeniedReportByPeriodOutputDto } from '../dtos/generate-denied-report-by-period-output.dto';

export interface GenerateDeniedReportByPeriodUseCaseInterface {
  execute(input: GenerateDeniedReportByPeriodInputDto): Promise<GenerateDeniedReportByPeriodOutputDto>;
}
