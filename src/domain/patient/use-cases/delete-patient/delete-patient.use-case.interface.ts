import { DeletePatientInputDto } from './dtos/delete-patient-input.dto';

export interface DeletePatientUseCaseInterface {
  execute(input: DeletePatientInputDto): Promise<void>;
}
