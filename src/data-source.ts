import { DataSource } from 'typeorm';
import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/shared/migrations/*.js'],
  synchronize: true,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});
