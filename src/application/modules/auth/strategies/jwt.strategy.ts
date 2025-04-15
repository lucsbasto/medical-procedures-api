import { GetUserByIdInterface } from '@/domain/user/usecases/get-by-id/get-user-by-id.use-case.interface';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type JwtPayload = {
  sub: string;
  username: string;
};

type ValidateResponse = {
  id: string;
  username: string;
  email: string;
  roles: string[];
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @Inject('GetUserByIdInterface')
    private readonly getUserByIdUseCase: GetUserByIdInterface,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<ValidateResponse> {
    const userId = payload.sub;
    const user = await this.getUserByIdUseCase.execute(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };
  }
}
