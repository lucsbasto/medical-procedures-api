import { GetAllDoctorsUseCaseInterface } from '@/domain/doctor/use-cases/get-all-doctors/get-all-doctors.use-case.interface';
import { GetDoctorByIdUseCaseInterface } from '@/domain/doctor/use-cases/get-doctor-by-id/get-doctor-by-id.use-case.interface';
import { RegisterDoctorUseCaseInterface } from '@/domain/doctor/use-cases/register-doctor/register-doctor.use-case.interface';
import { ILoggerService } from '@/domain/interfaces/common/logger';
import { Body, Controller, Get, Inject, Param, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { DoctorResponseDto } from './dtos/doctor-response.dto';

@ApiTags('Doctors')
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
  @ApiCreatedResponse({ description: 'Médico criado com sucesso.', type: DoctorResponseDto })
  @ApiBadRequestResponse({ description: 'Dados de requisição inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async create(@Body(new ValidationPipe()) createDoctorDto: CreateDoctorDto): Promise<DoctorResponseDto> {
    this.loggerService.info(`create - ${JSON.stringify(createDoctorDto)}`);
    return await this.registerDoctorUseCase.execute(createDoctorDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de todos os médicos.', type: [DoctorResponseDto] })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findAll(): Promise<DoctorResponseDto[]> {
    this.loggerService.info('findAll');
    return await this.getAllDoctorsUseCase.execute();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalhes de um médico específico.', type: DoctorResponseDto })
  @ApiNotFoundResponse({ description: 'Médico não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID do médico em formato inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  async findOne(@Param('id') id: string): Promise<DoctorResponseDto> {
    this.loggerService.info(`findOne - ${id}`);
    return await this.getDoctorByIdUseCase.execute({ id });
  }
}
