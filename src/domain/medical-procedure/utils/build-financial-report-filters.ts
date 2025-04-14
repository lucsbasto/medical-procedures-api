import { Between } from 'typeorm';

export function buildReportFilters(input: any): any {
  if (!input) {
    return {};
  }
  const { startDate, endDate, doctorId, paymentStatus } = input;

  const filters: any = {};

  if (startDate && endDate) {
    filters.procedureDate = Between(startDate, endDate);
  }

  if (doctorId) {
    filters.doctorId = doctorId;
  }

  if (paymentStatus) {
    filters.paymentStatus = paymentStatus;
  }

  return filters;
}
