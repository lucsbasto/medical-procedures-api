import { DoctorOutputDto } from '../dtos/doctor-output.dto';
import { RegisterDoctorInputDto } from '../dtos/register-doctor-input.dto';

export interface RegisterDoctorUseCaseInterface {
  execute(input: RegisterDoctorInputDto): Promise<DoctorOutputDto>;
}
