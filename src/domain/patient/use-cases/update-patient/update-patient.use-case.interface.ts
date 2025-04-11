import { GetPatientByIdOutputDto } from '../dtos/get-patient-by-id-output.dto';
import { UpdatePatientInputDto } from '../dtos/update-patient-input.dto';

export interface UpdatePatientUseCaseInterface {
  execute(input: UpdatePatientInputDto): Promise<GetPatientByIdOutputDto | null>;
}
