import { Role } from '@/common/enums/role.enum';
import { GetAllDoctorsUseCaseInterface } from '@/domain/doctor/use-cases/get-all-doctors/get-all-doctors.use-case.interface';
import { GetDoctorByIdUseCaseInterface } from '@/domain/doctor/use-cases/get-doctor-by-id/get-doctor-by-id.use-case.interface';
import { RegisterDoctorUseCaseInterface } from '@/domain/doctor/use-cases/register-doctor/register-doctor.use-case.interface';
import { ILoggerService } from '@/domain/interfaces/common/logger';
import { Body, Controller, Get, Inject, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { DoctorResponseDto } from './dtos/doctor-response.dto';

@ApiTags('Doctors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(
    @Inject('ILoggerService')
    private readonly loggerService: ILoggerService,
    @Inject('RegisterDoctorUseCaseInterface')
    private readonly registerDoctorUseCase: RegisterDoctorUseCaseInterface,
    @Inject('GetAllDoctorsUseCaseInterface')
    private readonly getAllDoctorsUseCase: GetAllDoctorsUseCaseInterface,
    @Inject('GetDoctorByIdUseCaseInterface')
    private readonly getDoctorByIdUseCase: GetDoctorByIdUseCaseInterface,
  ) {
    this.loggerService.setContext(DoctorsController.name);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({ description: 'Médico criado com sucesso.', type: DoctorResponseDto })
  @ApiBadRequestResponse({ description: 'Dados de requisição inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async create(@Body(new ValidationPipe()) createDoctorDto: CreateDoctorDto): Promise<DoctorResponseDto> {
    this.loggerService.info(`create - ${JSON.stringify(createDoctorDto)}`);
    return await this.registerDoctorUseCase.execute(createDoctorDto);
  }

  @Get()
  @Roles(Role.SUPPORT, Role.ADMIN)
  @ApiOkResponse({ description: 'Lista de todos os médicos.', type: [DoctorResponseDto] })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findAll(): Promise<DoctorResponseDto[]> {
    this.loggerService.info('findAll');
    return await this.getAllDoctorsUseCase.execute();
  }

  @Get(':id')
  @Roles(Role.SUPPORT, Role.ADMIN)
  @ApiOkResponse({ description: 'Detalhes de um médico específico.', type: DoctorResponseDto })
  @ApiNotFoundResponse({ description: 'Médico não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID do médico em formato inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string): Promise<DoctorResponseDto> {
    this.loggerService.info(`findOne - ${id}`);
    return await this.getDoctorByIdUseCase.execute({ id });
  }
}
