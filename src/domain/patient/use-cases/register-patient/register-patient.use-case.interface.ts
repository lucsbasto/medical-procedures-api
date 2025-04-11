import { RegisterPatientInputDto } from '../dtos/register-patient-input.dto';
import { RegisterPatientOutputDto } from '../dtos/register-patient-output.dto';

export interface RegisterPatientUseCaseInterface {
  execute(input: RegisterPatientInputDto): Promise<RegisterPatientOutputDto>;
}
