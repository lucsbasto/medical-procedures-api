import { GetUserByIdOutput } from './dtos/get-by-username.output';

export interface GetUserByIdInterface {
  execute(id: string): Promise<GetUserByIdOutput>;
}
