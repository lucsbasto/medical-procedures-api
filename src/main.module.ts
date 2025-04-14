import { Module } from '@nestjs/common';
import { DoctorsModule } from './application/modules/doctors/controllers/doctors.module';
import { LoggerModule } from './common/logger/logger.module';
import { DataSourcePostgresModule } from './infrastructure/database/typeorm/config/data-source-postgres.module';

@Module({
  imports: [DataSourcePostgresModule, LoggerModule, DoctorsModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
