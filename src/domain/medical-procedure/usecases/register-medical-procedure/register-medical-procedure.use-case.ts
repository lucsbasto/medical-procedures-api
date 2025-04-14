import { Inject, Injectable } from '@nestjs/common';
import { MedicalProcedure } from '../../entities/medical-procedure.entity';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';
import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';
import { RegisterMedicalProcedureInputDto } from '../dtos/register-medical-procedure-input.dto';
import { RegisterMedicalProcedureUseCaseInterface } from './register-medical-procedure.use-case.interface';

@Injectable()
export class RegisterMedicalProcedureUseCase implements RegisterMedicalProcedureUseCaseInterface {
  constructor(
    @Inject('MedicalProcedureRepository')
    private readonly medicalProcedureRepository: MedicalProcedureRepository,
  ) {}

  async execute(input: RegisterMedicalProcedureInputDto): Promise<MedicalProcedureOutputDto> {
    const { doctorId, patientId, procedureDate, procedureValue, paymentStatus, procedureName, denialReason } = input;

    if (!doctorId || doctorId.trim() === '') {
      throw new Error('Doctor ID cannot be empty.');
    }
    if (!patientId || patientId.trim() === '') {
      throw new Error('Patient ID cannot be empty.');
    }
    if (!procedureDate) {
      throw new Error('Procedure date cannot be empty.');
    }
    if (procedureValue === undefined || procedureValue === null || procedureValue <= 0) {
      throw new Error('Procedure value must be a positive number.');
    }
    if (!paymentStatus) {
      throw new Error('Payment status cannot be empty.');
    }

    if (!procedureName || procedureName.trim() === '') {
      throw new Error('Procedure name cannot be empty.');
    }

    const medicalProcedure = new MedicalProcedure(
      undefined,
      doctorId,
      patientId,
      procedureName,
      procedureDate,
      procedureValue,
      paymentStatus,
      denialReason,
    );

    const createdMedicalProcedure = await this.medicalProcedureRepository.create(medicalProcedure);

    return {
      id: createdMedicalProcedure.id,
      doctorId: createdMedicalProcedure.doctorId,
      patientId: createdMedicalProcedure.patientId,
      procedureName: createdMedicalProcedure.procedureName,
      procedureDate: createdMedicalProcedure.procedureDate,
      procedureValue: createdMedicalProcedure.procedureValue,
      paymentStatus: createdMedicalProcedure.paymentStatus,
      denialReason: createdMedicalProcedure.denialReason,
    };
  }
}
