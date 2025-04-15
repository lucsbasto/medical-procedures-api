import { SignInResponseDto } from '../controllers/dtos/sign-in-response.dto';
import { SignInDto } from '../controllers/dtos/sign-in.dto';

export interface SignInUseCaseInterface {
  execute(input: SignInDto): Promise<SignInResponseDto>;
}
