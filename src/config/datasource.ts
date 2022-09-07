import DatabaseConfig from '@config/typeorm';
import { DataSource } from 'typeorm';

export default new DataSource(DatabaseConfig);
