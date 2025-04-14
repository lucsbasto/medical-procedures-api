import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourcePostgres } from './postgres.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => Object.assign(dataSourcePostgres),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DataSourcePostgresModule {}
