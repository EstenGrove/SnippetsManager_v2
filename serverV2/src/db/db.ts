import { dbConfig } from "../config/dbConfig";
import { Pool, PoolConfig } from "pg";

const pool = new Pool(dbConfig as PoolConfig);

export default pool;
