import { DoctorRepository } from '@/domain/doctor/repositories/doctor.repository';
import { Injectable } from '@nestjs/common';
import { PaymentStatus } from '../../enums/payment-status.enum';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';
import { GenerateGlossesReportByPeriodInputDto } from '../dtos/generate-glosses-report-by-period-input.dto';
import {
  GenerateGlossesReportByPeriodOutputDto,
  GlossedProcedure,
} from '../dtos/generate-glosses-report-by-period-output.dto';
import { GenerateGlossesReportByPeriodUseCaseInterface } from './generate-glosses-report-by-period.use-case.interface';

@Injectable()
export class GenerateGlossesReportByPeriodUseCase implements GenerateGlossesReportByPeriodUseCaseInterface {
  constructor(
    private readonly medicalProcedureRepository: MedicalProcedureRepository,
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async execute(input: GenerateGlossesReportByPeriodInputDto): Promise<GenerateGlossesReportByPeriodOutputDto> {
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

    const glossedProcedures = await this.medicalProcedureRepository.findAll(filters);

    const report: GenerateGlossesReportByPeriodOutputDto = [];

    for (const procedure of glossedProcedures) {
      let doctorName: string | undefined;
      const doctor = await this.doctorRepository.findById(procedure.doctorId);
      if (doctor) {
        doctorName = doctor.name;
      }

      const glossedProcedure: GlossedProcedure = {
        id: procedure.id,
        doctorId: procedure.doctorId,
        doctorName,
        patientId: procedure.patientId,
        procedureName: procedure.procedureName,
        procedureDate: procedure.procedureDate,
        procedureValue: procedure.procedureValue,
        denialReason: procedure.denialReason,
      };
      report.push(glossedProcedure);
    }

    return report;
  }
}
