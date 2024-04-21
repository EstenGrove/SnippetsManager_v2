import { dbConfig } from "../config/dbConfig";
import { Pool, PoolConfig, QueryResult } from "pg";

export type IQueryRows = QueryResult["rows"] | [];

const pool = new Pool(dbConfig as PoolConfig);

export default pool;
