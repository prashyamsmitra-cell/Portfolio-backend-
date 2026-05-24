import { Pool, type PoolConfig } from "pg";
import { config } from "./config";

let pool: Pool | null = null;

function getPoolConfig(): PoolConfig {
  if (!config.databaseUrl) {
    throw new Error("DATABASE_URL is required to persist recruiter visits.");
  }

  return {
    connectionString: config.databaseUrl,
    ssl: config.databaseSsl ? { rejectUnauthorized: false } : undefined,
  };
}

export function getDb() {
  if (!pool) {
    pool = new Pool(getPoolConfig());
  }

  return pool;
}
