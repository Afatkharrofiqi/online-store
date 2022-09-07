import { env } from 'process';
import { DataSourceOptions } from 'typeorm';

const DatabaseConfig = {
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT, 10),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migration/*{.ts,.js}'],
  subscribers: [__dirname + '/../subscriber/*{.ts,.js}'],
  seeds: [__dirname + '/../database/seeder/**/*{.ts,.js}'],
  factories: [__dirname + '/../database/factory/**/*{.ts,.js}'],
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

export default DatabaseConfig;
