import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';
import { UpdateMedicalProcedureInputDto } from '../dtos/update-medical-procedure-input.dto';

export interface UpdateMedicalProcedureUseCaseInterface {
  execute(input: UpdateMedicalProcedureInputDto): Promise<MedicalProcedureOutputDto | null>;
}
