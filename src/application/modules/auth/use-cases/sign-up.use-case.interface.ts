import { SignUpResponseDto } from '../controllers/dtos/sign-up-response.dto';
import { SignUpDto } from '../controllers/dtos/sign-up.dto';

export interface SignUpUseCaseInterface {
  execute(input: SignUpDto): Promise<SignUpResponseDto>;
}
