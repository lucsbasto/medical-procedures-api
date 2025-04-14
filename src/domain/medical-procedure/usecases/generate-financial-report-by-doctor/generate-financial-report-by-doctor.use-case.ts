import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';

import { GenerateFinancialReportByDoctorInputDto } from '../dtos/generate-financial-report-by-doctor-input.dto';
import { GenerateFinancialReportByDoctorUseCaseInterface } from './generate-financial-report-by-doctor.use-case.interface';

@Injectable()
export class GenerateFinancialReportByDoctorUseCase implements GenerateFinancialReportByDoctorUseCaseInterface {
  constructor(
    @Inject('MedicalProcedureRepository')
    private readonly medicalProcedureRepository: MedicalProcedureRepository,
  ) {}

  async execute(filter: GenerateFinancialReportByDoctorInputDto): Promise<any[]> {
    const { startDate, endDate } = filter;

    if (!startDate || !endDate) {
      throw new BadRequestException('Start date and end date must be provided for the financial report.');
    }

    if (startDate > endDate) {
      throw new BadRequestException('Start date cannot be after the end date.');
    }

    const procedures = await this.medicalProcedureRepository.findGroupedByDoctor(filter);
    return procedures;
  }
}
