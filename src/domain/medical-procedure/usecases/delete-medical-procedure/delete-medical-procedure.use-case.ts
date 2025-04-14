import { Inject, Injectable } from '@nestjs/common';
import { MedicalProcedureRepository } from '../../repositories/medical-procedure.repository';
import { DeleteMedicalProcedureInputDto } from '../dtos/delete-medical-procedure-input.dto';
import { DeleteMedicalProcedureUseCaseInterface } from './delete-medical-procedure.use-case.interface';

@Injectable()
export class DeleteMedicalProcedureUseCase implements DeleteMedicalProcedureUseCaseInterface {
  constructor(
    @Inject('MedicalProcedureRepository')
    private readonly medicalProcedureRepository: MedicalProcedureRepository,
  ) {}

  async execute(input: DeleteMedicalProcedureInputDto): Promise<void> {
    const { id } = input;

    if (!id || id.trim() === '') {
      throw new Error('Medical procedure ID cannot be empty for deletion.');
    }

    const existingProcedure = await this.medicalProcedureRepository.findById(id);
    if (!existingProcedure) {
      return;
    }

    await this.medicalProcedureRepository.delete(id);
  }
}
