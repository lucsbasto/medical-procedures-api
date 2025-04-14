import { Injectable } from '@nestjs/common';
import { DoctorRepository } from '../../../doctor/repositories/doctor.repository';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';
import { GenerateDailyProcedureReportByDoctorInputDto } from '../dtos/generate-daily-procedure-report-by-doctor-input.dto';
import { GenerateDailyProcedureReportByDoctorOutputDto } from '../dtos/generate-daily-procedure-report-by-doctor-output.dto';
import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';
import { GenerateDailyProcedureReportByDoctorUseCaseInterface } from './generate-daily-procedure-report-by-doctor.use-case.interface';

@Injectable()
export class GenerateDailyProcedureReportByDoctorUseCase
  implements GenerateDailyProcedureReportByDoctorUseCaseInterface
{
  constructor(
    private readonly medicalProcedureRepository: MedicalProcedureRepository,
    private readonly doctorRepository: DoctorRepository,
  ) {}

  async execute(
    input: GenerateDailyProcedureReportByDoctorInputDto,
  ): Promise<GenerateDailyProcedureReportByDoctorOutputDto> {
    const { date } = input;

    if (!date) {
      throw new Error('Date must be provided for the daily report.');
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const filters = {
      procedureDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    };

    const procedures = await this.medicalProcedureRepository.findAll(filters);

    const proceduresByDoctor: Record<string, MedicalProcedureOutputDto[]> = {};
    for (const procedure of procedures) {
      if (!proceduresByDoctor[procedure.doctorId]) {
        proceduresByDoctor[procedure.doctorId] = [];
      }
      proceduresByDoctor[procedure.doctorId].push({
        id: procedure.id,
        doctorId: procedure.doctorId,
        patientId: procedure.patientId,
        procedureName: procedure.procedureName,
        procedureDate: procedure.procedureDate,
        procedureValue: procedure.procedureValue,
        paymentStatus: procedure.paymentStatus,
        denialReason: procedure.denialReason,
      });
    }

    const report: GenerateDailyProcedureReportByDoctorOutputDto = [];
    for (const doctorId in proceduresByDoctor) {
      const doctorProcedures = proceduresByDoctor[doctorId];
      const totalProcedures = doctorProcedures.length;
      const totalValue = doctorProcedures.reduce((sum, procedure) => sum + procedure.procedureValue, 0);

      const doctor = await this.doctorRepository.findById(doctorId);
      const doctorName = doctor ? doctor.name : 'Unknown Doctor';

      report.push({
        doctorId,
        doctorName,
        procedures: doctorProcedures,
        totalProcedures,
        totalValue,
      });
    }

    return report;
  }
}
