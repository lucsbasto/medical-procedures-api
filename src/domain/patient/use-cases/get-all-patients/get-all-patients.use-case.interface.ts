import { GetAllPatientsOutputDto } from './dtos/get-all-patients-output.dto';

export interface GetAllPatientsUseCaseInterface {
  execute(): Promise<GetAllPatientsOutputDto[]>;
}
