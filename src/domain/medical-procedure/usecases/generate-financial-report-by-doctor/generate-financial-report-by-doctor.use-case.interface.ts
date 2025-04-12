import { GenerateFinancialReportByDoctorInputDto } from '../dtos/generate-financial-report-by-doctor-input.dto';
import { GenerateFinancialReportByDoctorOutputDto } from '../dtos/generate-financial-report-by-doctor-output.dto';

export interface GenerateFinancialReportByDoctorUseCaseInterface {
  execute(input: GenerateFinancialReportByDoctorInputDto): Promise<GenerateFinancialReportByDoctorOutputDto>;
}
