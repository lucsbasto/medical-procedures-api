import { GetAllMedicalProceduresInputDto } from '../dtos/get-all-medical-procedures-input.dto';
import { MedicalProcedureOutputDto } from '../dtos/medical-procedure-output.dto';

export interface GetAllMedicalProceduresUseCaseInterface {
  execute(filters?: GetAllMedicalProceduresInputDto): Promise<MedicalProcedureOutputDto[]>;
}
