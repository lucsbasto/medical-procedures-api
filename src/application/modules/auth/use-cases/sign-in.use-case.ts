import { Password } from '@/common/helpers/password.helper';
import { GetUserByUsernameUseCaseInterface } from '@/domain/user/usecases/get-by-username/get-by-username.use-case.inferface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInResponseDto } from '../controllers/dtos/sign-in-response.dto';
import { SignInDto } from '../controllers/dtos/sign-in.dto';
import { GenerateJwtUseCaseInterface } from './generate-jwt.use-case';
import { SignInUseCaseInterface } from './sign-in.use-case.interface';

@Injectable()
export class SignInUseCase implements SignInUseCaseInterface {
  constructor(
    @Inject('GetUserByUsernameUseCaseInterface')
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCaseInterface,
    @Inject('GenerateJwtUseCaseInterface')
    private readonly generateJwtUseCase: GenerateJwtUseCaseInterface,
  ) {}

  async execute(input: SignInDto): Promise<SignInResponseDto> {
    const { password, username } = input;
    const existingUser = await this.getUserByUsernameUseCase.execute(username);
    if (!existingUser) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }
    const isPasswordValid = await Password.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }
    const { accessToken } = await this.generateJwtUseCase.execute(existingUser);
    return {
      accessToken,
    };
  }
}
