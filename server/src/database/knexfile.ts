import { Knex } from 'knex';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const config: IKnexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST_DEV,
      port: Number(process.env.DB_PORT_DEV),
      user: process.env.DB_USER_DEV,
      password: process.env.DB_PASSWORD_DEV ,
      database: process.env.DB_NAME_DEV,
    },
    migrations: {
      directory: './migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './seeds',
      extension: 'ts',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST_PROD,
      port: Number(process.env.DB_PORT_PROD),
      user: process.env.DB_USER_PROD,
      password: process.env.DB_PASSWORD_PROD,
      database: process.env.DB_NAME_PROD,
    },
    migrations: {
      directory: './migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './seeds',
      extension: 'ts',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config; 