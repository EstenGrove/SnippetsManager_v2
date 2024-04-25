import { dbConfig } from "../config/dbConfig";
import { Pool, PoolConfig, QueryResult } from "pg";

export type IQueryRows = QueryResult["rows"] | [];

/**
 * Generic QueryRow type
 */
export type TQueryRows<T> = T;

const pool = new Pool(dbConfig as PoolConfig);

export default pool;
