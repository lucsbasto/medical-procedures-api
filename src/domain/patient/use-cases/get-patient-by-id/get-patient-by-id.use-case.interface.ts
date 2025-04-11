import { GetPatientByIdInputDto } from '../dtos/get-patient-by-id-input.dto';
import { GetPatientByIdOutputDto } from '../dtos/get-patient-by-id-output.dto';

export interface GetPatientByIdUseCaseInterface {
  execute(input: GetPatientByIdInputDto): Promise<GetPatientByIdOutputDto | null>;
}
