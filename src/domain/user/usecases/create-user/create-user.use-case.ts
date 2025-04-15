import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from '../../entities/repositories/user.repository';
import { User } from '../../entities/user.entity';
import { CreateUserInput } from '../dtos/create-user.input';
import { CreateUserOutput } from '../dtos/create-user.output';
import { CreateUserUseCaseInterface } from './create-user.use-case.interface';

@Injectable()
export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput | null> {
    const existingUser = await this.userRepository.findByUsername(input.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const newUser = new User(undefined, input.username, hashedPassword, input.email, []);

    await this.userRepository.create(newUser);
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      roles: newUser.roles,
    };
  }
}
