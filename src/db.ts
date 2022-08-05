import {Pool} from 'pg';

const sslOptions = {
  rejectUnauthorized: false,
};

export const pgPool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DEVELOPMENT_MODE ? false : sslOptions,
});
