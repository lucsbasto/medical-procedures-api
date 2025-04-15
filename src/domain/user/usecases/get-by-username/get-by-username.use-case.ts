// src/users/use-cases/get-user-by-username.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../entities/repositories/user.repository';
import { GetUserByUsernameOutput } from './dtos/get-by-username.output';
import { GetUserByUsernameUseCaseInterface } from './get-by-username.use-case.inferface';

@Injectable()
export class GetUserByUsernameUseCase implements GetUserByUsernameUseCaseInterface {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(username: string): Promise<GetUserByUsernameOutput> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      password: user.password,
    };
  }
}
