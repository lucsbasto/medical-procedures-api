import { GetPatientByIdOutputDto } from '../dtos/get-patient-by-id-output.dto';
import { RegisterPatientInputDto } from '../dtos/register-patient-input.dto';

export interface RegisterPatientUseCaseInterface {
  execute(input: RegisterPatientInputDto): Promise<GetPatientByIdOutputDto>;
}
