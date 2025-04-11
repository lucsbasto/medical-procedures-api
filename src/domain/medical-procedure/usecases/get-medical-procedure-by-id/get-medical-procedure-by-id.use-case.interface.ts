import { GetMedicalProcedureByIdInputDto } from '../dtos/get-medical-procedure-by-id-input.dto';
import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';

export interface GetMedicalProcedureByIdUseCaseInterface {
  execute(input: GetMedicalProcedureByIdInputDto): Promise<MedicalProcedureOutputDto | null>;
}
