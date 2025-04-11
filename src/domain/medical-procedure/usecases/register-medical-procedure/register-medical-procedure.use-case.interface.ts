import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';
import { RegisterMedicalProcedureInputDto } from '../dtos/register-medical-procedure-input.dto';

export interface RegisterMedicalProcedureUseCaseInterface {
  execute(input: RegisterMedicalProcedureInputDto): Promise<MedicalProcedureOutputDto>;
}
