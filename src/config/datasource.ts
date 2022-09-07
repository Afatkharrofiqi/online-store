import { DataSource } from 'typeorm';
import DatabaseConfig from './typeorm.config';

export default new DataSource(DatabaseConfig);
