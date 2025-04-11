import { DoctorOutputDto } from '../dtos/doctor-output.dto';
import { GetAllDoctorsInputDto } from '../dtos/get-all-doctors-input.dto';

export interface GetAllDoctorsUseCaseInterface {
  execute(filters?: GetAllDoctorsInputDto): Promise<DoctorOutputDto[]>;
}
