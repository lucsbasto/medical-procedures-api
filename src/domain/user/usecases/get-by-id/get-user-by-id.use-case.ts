// src/users/use-cases/get-user-by-username.use-case.ts
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../entities/repositories/user.repository';
import { GetUserByIdOutput } from './dtos/get-by-username.output';
import { GetUserByIdInterface } from './get-user-by-id.use-case.interface';

@Injectable()
export class GetUserByIdUseCase implements GetUserByIdInterface {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<GetUserByIdOutput> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
  }
}
