import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';

export interface GetMedicalProcedureByIdUseCaseInterface {
  execute(id: string): Promise<MedicalProcedureOutputDto | null>;
}
