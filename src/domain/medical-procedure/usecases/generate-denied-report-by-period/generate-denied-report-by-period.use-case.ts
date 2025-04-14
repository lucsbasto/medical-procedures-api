import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentStatus } from '../../enums/payment-status.enum';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';
import { GenerateDeniedReportByPeriodInputDto } from '../dtos/generate-denied-report-by-period-input.dto';
import {
  DeniedProcedure,
  GenerateDeniedReportByPeriodOutputDto,
} from '../dtos/generate-denied-report-by-period-output.dto';
import { GenerateDeniedReportByPeriodUseCaseInterface } from './generate-denied-report-by-period.use-case.interface';

@Injectable()
export class GenerateDeniedReportByPeriodUseCase implements GenerateDeniedReportByPeriodUseCaseInterface {
  constructor(
    @Inject('MedicalProcedureRepository')
    private readonly medicalProcedureRepository: MedicalProcedureRepository,
    @Inject('DoctorRepository')
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async execute(input: GenerateDeniedReportByPeriodInputDto): Promise<GenerateDeniedReportByPeriodOutputDto> {
    const { startDate, endDate } = input;

    if (!startDate || !endDate) {
      throw new Error('Start date and end date must be provided for the glosses report.');
    }

    if (startDate > endDate) {
      throw new Error('Start date cannot be after the end date.');
    }

    const filters = {
      procedureDate: {
        gte: startDate,
        lte: endDate,
      },
      paymentStatus: PaymentStatus.DENIED,
    };

    const deniedProcedures = await this.medicalProcedureRepository.findAll(filters);

    const report: GenerateDeniedReportByPeriodOutputDto = [];

    for (const procedure of deniedProcedures) {
      let doctorName: string | undefined;
      const doctor = await this.doctorRepository.findById(procedure.doctorId);
      if (doctor) {
        doctorName = doctor.name;
      }

      const deniedProcedure: DeniedProcedure = {
        id: procedure.id,
        doctorId: procedure.doctorId,
        doctorName,
        patientId: procedure.patientId,
        procedureName: procedure.procedureName,
        procedureDate: procedure.procedureDate,
        procedureValue: procedure.procedureValue,
        denialReason: procedure.denialReason,
      };
      report.push(deniedProcedure);
    }

    return report;
  }
}
