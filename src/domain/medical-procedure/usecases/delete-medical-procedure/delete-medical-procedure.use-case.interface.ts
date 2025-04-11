import { DeleteMedicalProcedureInputDto } from '../dtos/delete-medical-procedure-input.dto';

export interface DeleteMedicalProcedureUseCaseInterface {
  execute(input: DeleteMedicalProcedureInputDto): Promise<void>;
}
