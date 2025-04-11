import { RegisterDoctorInputDto } from '../dtos/register-doctor-input.dto';
import { RegisterDoctorOutputDto } from '../dtos/register-doctor-output.dto';

export interface RegisterDoctorUseCaseInterface {
  execute(input: RegisterDoctorInputDto): Promise<RegisterDoctorOutputDto>;
}
