import { GetUserByUsernameOutput } from './dtos/get-by-username.output';

export interface GetUserByUsernameUseCaseInterface {
  execute(username: string): Promise<GetUserByUsernameOutput>;
}
