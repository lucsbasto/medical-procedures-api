import { Body, Controller, HttpStatus, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUseCaseInterface } from '../use-cases/sign-in.use-case.interface';
import { SignUpUseCaseInterface } from '../use-cases/sign-up.use-case.interface';
import { SignInResponseDto } from './dtos/sign-in-response.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpResponseDto } from './dtos/sign-up-response.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('SignUpUseCaseInterface')
    private readonly signUpUseCase: SignUpUseCaseInterface,
    @Inject('SignInUseCaseInterface')
    private readonly signInUseCase: SignInUseCaseInterface,
  ) {}

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, description: 'Login bem-sucedido', type: SignInResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Credenciais inválidas' })
  async signin(@Body(ValidationPipe) loginDto: SignInDto): Promise<SignInResponseDto> {
    return this.signInUseCase.execute(loginDto);
  }

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Usuário registrado com sucesso', type: SignUpResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Nome de usuário já existe ou dados inválidos' })
  async signup(@Body(ValidationPipe) createUserDto: SignUpDto): Promise<SignUpResponseDto> {
    return await this.signUpUseCase.execute(createUserDto);
  }
}
