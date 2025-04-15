import { ILoggerService } from '@/domain/interfaces/common/logger';
import { UserRepository } from '@/domain/user/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../domain/user/entities/user.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
    @InjectRepository(UserEntity)
    private readonly ormRepository: Repository<UserEntity>,
  ) {
    this.loggerService.setContext(TypeOrmUserRepository.name);
  }

  async findById(id: string): Promise<User | undefined> {
    this.loggerService.log(`findById - ${id}`);
    const userEntity = await this.ormRepository.findOne({ where: { id } });
    if (!userEntity) {
      return undefined;
    }
    return new User(userEntity.id, userEntity.username, userEntity.password, userEntity.email, userEntity.roles);
  }

  async create(user: User): Promise<User> {
    const userEntity = this.ormRepository.create({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      roles: user.roles,
    });
    const savedUser = await this.ormRepository.save(userEntity);
    return new User(savedUser.id, savedUser.username, savedUser.password, savedUser.email, savedUser.roles);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const userEntity = await this.ormRepository.findOne({ where: { username } });
    if (!userEntity) {
      return undefined;
    }
    return new User(userEntity.id, userEntity.username, userEntity.password, userEntity.email, userEntity.roles);
  }
}
