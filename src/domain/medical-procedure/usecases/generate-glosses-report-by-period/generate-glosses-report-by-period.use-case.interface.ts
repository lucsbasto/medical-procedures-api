import { GenerateGlossesReportByPeriodInputDto } from '../dtos/generate-glosses-report-by-period-input.dto';
import { GenerateGlossesReportByPeriodOutputDto } from '../dtos/generate-glosses-report-by-period-output.dto';

export interface GenerateGlossesReportByPeriodUseCaseInterface {
  execute(input: GenerateGlossesReportByPeriodInputDto): Promise<GenerateGlossesReportByPeriodOutputDto>;
}
