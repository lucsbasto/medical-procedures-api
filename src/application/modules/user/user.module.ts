// src/users/users.module.ts
import { LoggerService } from '@/common/logger/logger.service';
import { UserEntity } from '@/infrastructure/database/typeorm/entities/user.entity';
import { TypeOrmUserRepository } from '@/infrastructure/database/typeorm/repositories/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [
    {
      provide: 'ILoggerService',
      useClass: LoggerService,
    },
    TypeOrmUserRepository,
  ],
  exports: [TypeOrmUserRepository],
})
export class UsersModule {}
