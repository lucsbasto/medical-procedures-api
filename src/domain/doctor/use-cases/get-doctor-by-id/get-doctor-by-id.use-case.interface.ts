import { DoctorOutputDto } from '../dtos/doctor-output.dto';
import { GetDoctorByIdInputDto } from '../dtos/get-doctor-by-id-input.dto';

export interface GetDoctorByIdUseCaseInterface {
  execute(input: GetDoctorByIdInputDto): Promise<DoctorOutputDto | null>;
}
