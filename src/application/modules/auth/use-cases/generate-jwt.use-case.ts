import { User } from '@/domain/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export type GenerateJwtOutput = {
  accessToken: string;
};

export type CreatedUser = Pick<User, 'id' | 'username' | 'roles'>;

export interface GenerateJwtUseCaseInterface {
  execute(user: CreatedUser): Promise<GenerateJwtOutput>;
}

@Injectable()
export class GenerateJwtUseCase implements GenerateJwtUseCaseInterface {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async execute(user: CreatedUser): Promise<GenerateJwtOutput> {
    const payload = { sub: user.id, username: user.username, roles: user.roles };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '1h',
    });
    return { accessToken };
  }
}
