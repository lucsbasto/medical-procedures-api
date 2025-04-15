import { CreateUserInput } from '../dtos/create-user.input';
import { CreateUserOutput } from '../dtos/create-user.output';

export interface CreateUserUseCaseInterface {
  execute(input: CreateUserInput): Promise<CreateUserOutput | null>;
}
