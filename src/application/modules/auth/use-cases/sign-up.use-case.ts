import { Password } from '@/common/helpers/password.helper';
import { CreateUserUseCaseInterface } from '@/domain/user/usecases/create-user/create-user.use-case.interface';
import { GetUserByUsernameUseCaseInterface } from '@/domain/user/usecases/get-by-username/get-by-username.use-case.inferface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SignUpResponseDto } from '../controllers/dtos/sign-up-response.dto';
import { SignUpDto } from '../controllers/dtos/sign-up.dto';
import { GenerateJwtUseCaseInterface } from './generate-jwt.use-case';
import { SignUpUseCaseInterface } from './sign-up.use-case.interface';

@Injectable()
export class SignUpUseCase implements SignUpUseCaseInterface {
  constructor(
    @Inject('GetUserByUsernameUseCaseInterface')
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCaseInterface,
    @Inject('CreateUserUseCaseInterface')
    private readonly createUserUseCaseInterface: CreateUserUseCaseInterface,
    @Inject('GenerateJwtUseCaseInterface')
    private readonly generateJwtUseCase: GenerateJwtUseCaseInterface,
  ) {}

  async execute(input: SignUpDto): Promise<SignUpResponseDto> {
    const existingUser = await this.getUserByUsernameUseCase.execute(input.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await Password.hash(input.password);

    const createdUser = await this.createUserUseCaseInterface.execute({ ...input, password: hashedPassword });
    return await this.generateJwtUseCase.execute(createdUser);
  }
}
