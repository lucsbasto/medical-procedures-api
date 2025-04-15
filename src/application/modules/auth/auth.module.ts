import { LoggerService } from '@/common/logger/logger.service';
import { CreateUserUseCase } from '@/domain/user/usecases/create-user/create-user.use-case';
import { GetUserByIdUseCase } from '@/domain/user/usecases/get-by-id/get-user-by-id.use-case';
import { GetUserByUsernameUseCase } from '@/domain/user/usecases/get-by-username/get-by-username.use-case';
import { UserEntity } from '@/infrastructure/database/typeorm/entities/user.entity';
import { TypeOrmUserRepository } from '@/infrastructure/database/typeorm/repositories/user.repository';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GenerateJwtUseCase } from './use-cases/generate-jwt.use-case';
import { SignInUseCase } from './use-cases/sign-in.use-case';
import { SignUpUseCase } from './use-cases/sign-up.use-case';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h' },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: 'ILoggerService',
      useClass: LoggerService,
    },
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'SignUpUseCaseInterface',
      useClass: SignUpUseCase,
    },
    {
      provide: 'SignInUseCaseInterface',
      useClass: SignInUseCase,
    },
    {
      provide: 'GetUserByIdInterface',
      useClass: GetUserByIdUseCase,
    },
    {
      provide: 'GenerateJwtUseCaseInterface',
      useClass: GenerateJwtUseCase,
    },
    {
      provide: 'GetUserByUsernameUseCaseInterface',
      useClass: GetUserByUsernameUseCase,
    },
    {
      provide: 'CreateUserUseCaseInterface',
      useClass: CreateUserUseCase,
    },
  ],
  controllers: [AuthController],
  exports: [JwtModule, JwtAuthGuard],
})
export class AuthModule {}
