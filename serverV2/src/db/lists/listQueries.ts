import pool from "../db";
import { QueryResult } from "pg";
import { getAllRowsSorted, getRowsByID } from "../queries";
// column aliases
import { COLUMN_ALIASES, IColumnAliases, IColumnAlias } from "../tables/tables";
import { IDBListRecord, IDBUserListRecord } from "../../models/Lists/Lists";

export type IQueryRows = QueryResult["rows"] | [];

const TABLE_SHAPE: IColumnAlias = COLUMN_ALIASES.lists;
const TABLE_ID = TABLE_SHAPE.id;
const TABLE_NAME = "list_name";

const getAllLists = async (): Promise<QueryResult> => {
	const sortCol = TABLE_SHAPE.id;
	const name = TABLE_NAME;

	const rows = await getAllRowsSorted(sortCol, name);

	return rows as Promise<QueryResult<IDBListRecord[] | []>>;
};

const getAllListsByUser = async (
	userID: string
): Promise<IQueryRows | unknown> => {
	try {
		const data = await pool.query(
			`SELECT * FROM user_lists WHERE is_active = true AND user_id = $1`,
			[userID]
		);
		console.log("data.rows", data.rows);
		return data.rows;
	} catch (error: unknown) {
		console.log("error", error);
		return error;
	}
};

export { getAllLists, getAllListsByUser };
