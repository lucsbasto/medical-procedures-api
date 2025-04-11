import { GenerateDailyProcedureReportByDoctorInputDto } from '../dtos/generate-daily-procedure-report-by-doctor-input.dto';
import { GenerateDailyProcedureReportByDoctorOutputDto } from '../dtos/generate-daily-procedure-report-by-doctor-output.dto';

export interface GenerateDailyProcedureReportByDoctorUseCaseInterface {
  execute(input: GenerateDailyProcedureReportByDoctorInputDto): Promise<GenerateDailyProcedureReportByDoctorOutputDto>;
}
