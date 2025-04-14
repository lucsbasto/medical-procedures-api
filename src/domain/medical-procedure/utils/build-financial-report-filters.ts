import { Between } from 'typeorm';
import { GenerateFinancialReportByDoctorInputDto } from '../usecases/dtos/generate-financial-report-by-doctor-input.dto';

export function buildFinancialReportFilters(input: GenerateFinancialReportByDoctorInputDto): any {
  if (!input) {
    return {};
  }
  const { startDate, endDate, doctorId } = input;

  const filters: any = {};

  if (startDate && endDate) {
    filters.procedureDate = Between(startDate, endDate);
  }

  if (doctorId) {
    filters.doctorId = doctorId;
  }

  return filters;
}
