import { Injectable } from '@nestjs/common';
import { DoctorRepository } from '../../../doctor/repositories/doctor.repository';
import { PaymentStatus } from '../../enums/payment-status.enum';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';

import { GenerateFinancialReportByDoctorInputDto } from '../dtos/generate-financial-report-by-doctor-input.dto';
import {
  DoctorFinancialData,
  GenerateFinancialReportByDoctorOutputDto,
} from '../dtos/generate-financial-report-by-doctor-output.dto';
import { GenerateFinancialReportByDoctorUseCaseInterface } from './generate-financial-report-by-doctor.use-case.interface';

@Injectable()
export class GenerateFinancialReportByDoctorUseCase implements GenerateFinancialReportByDoctorUseCaseInterface {
  constructor(
    private readonly medicalProcedureRepository: MedicalProcedureRepository,
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async execute(input: GenerateFinancialReportByDoctorInputDto): Promise<GenerateFinancialReportByDoctorOutputDto> {
    const { startDate, endDate, doctorId } = input;

    if (!startDate || !endDate) {
      throw new Error('Start date and end date must be provided for the financial report.');
    }

    if (startDate > endDate) {
      throw new Error('Start date cannot be after the end date.');
    }

    const filters: any = {
      procedureDate: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (doctorId) {
      filters.doctorId = doctorId;
    }

    const procedures = await this.medicalProcedureRepository.findAll(filters);
    const financialDataByDoctor: Record<string, DoctorFinancialData> = {};
    const report: GenerateFinancialReportByDoctorOutputDto = [];

    for (const procedure of procedures) {
      if (!financialDataByDoctor[procedure.doctorId]) {
        financialDataByDoctor[procedure.doctorId] = {
          doctorId: procedure.doctorId,
          totalPaid: 0,
          totalPending: 0,
          totalDenied: 0,
        };
      }

      const financialData = financialDataByDoctor[procedure.doctorId];
      switch (procedure.paymentStatus) {
        case PaymentStatus.PAID:
          financialData.totalPaid += procedure.procedureValue;
          break;
        case PaymentStatus.PENDING:
          financialData.totalPending += procedure.procedureValue;
          break;
        case PaymentStatus.DENIED:
          financialData.totalDenied += procedure.procedureValue;
          break;
      }
    }

    for (const doctorId in financialDataByDoctor) {
      const financialData = financialDataByDoctor[doctorId];
      const doctor = await this.doctorRepository.findById(doctorId);
      if (doctor) {
        financialData.doctorName = doctor.name;
      }
      report.push(financialData);
    }

    return report;
  }
}
