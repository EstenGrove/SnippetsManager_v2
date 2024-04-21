import { QueryResult } from "pg";
import pool from "./db";

type TTableOptions = {
	idCol?: string;
	tableName?: string;
};

const getAllRows = async (
	tableName: string
): Promise<QueryResult["rows"] | unknown> => {
	try {
		const data = await pool.query(
			`SELECT * FROM ${tableName} WHERE is_active = true`
		);
		// console.log("data.rows", data.rows);
		return data.rows;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};

const getAllRowsSorted = async (
	sortCol: string,
	tableName: string
): Promise<QueryResult["rows"] | unknown> => {
	try {
		const data = await pool.query(
			`SELECT * FROM ${tableName} WHERE is_active = true ORDER BY ${sortCol}`
		);
		// console.log("data.rows", data.rows);
		return data.rows;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};

const getRowsByID = async (
	id: string | number,
	tableOptions: TTableOptions
): Promise<QueryResult["rows"] | unknown> => {
	// id to query for & tableName to query
	const { idCol, tableName } = tableOptions;

	try {
		const data = await pool.query(
			`SELECT * FROM ${tableName} WHERE is_active = true AND ${idCol} === $1`,
			[id]
		);
		console.log("data", data);
		return data.rows;
	} catch (error) {
		return error;
	}
};

export {
	// GENERIC QUERY UTILS //
	getAllRows,
	getRowsByID,
	getAllRowsSorted,
};
