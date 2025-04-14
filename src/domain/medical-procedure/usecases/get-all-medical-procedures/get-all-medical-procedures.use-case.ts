import { Inject, Injectable } from '@nestjs/common';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';

import { GetAllMedicalProceduresInputDto } from '../dtos/get-all-medical-procedures-input.dto';
import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';
import { GetAllMedicalProceduresUseCaseInterface } from './get-all-medical-procedures.use-case.interface';

@Injectable()
export class GetAllMedicalProceduresUseCase implements GetAllMedicalProceduresUseCaseInterface {
  constructor(
    @Inject('MedicalProcedureRepository')
    private readonly medicalProcedureRepository: MedicalProcedureRepository,
  ) {}

  async execute(filters?: GetAllMedicalProceduresInputDto): Promise<MedicalProcedureOutputDto[]> {
    const medicalProcedures = await this.medicalProcedureRepository.findAll(filters);
    return medicalProcedures.map((procedure) => ({
      id: procedure.id,
      doctorId: procedure.doctorId,
      patientId: procedure.patientId,
      procedureName: procedure.procedureName,
      procedureDate: procedure.procedureDate,
      procedureValue: procedure.procedureValue,
      paymentStatus: procedure.paymentStatus,
      denialReason: procedure.denialReason,
    }));
  }
}
