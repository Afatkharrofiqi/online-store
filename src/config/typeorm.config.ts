import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { env } from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmAyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => typeOrmConfig,
};

const typeOrmConfig = {
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT, 10),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migration/*{.ts,.js}'],
  subscribers: [__dirname + '/../subscriber/*{.ts,.js}'],
  cli: {
    entityDir: __dirname + '/../model',
    migrationsDir: __dirname + '/../database/migration',
    subscriberDir: __dirname + '/../subscriber',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: false,
} as DataSourceOptions;

const AppDataSource = new DataSource(typeOrmConfig);

export default AppDataSource;
