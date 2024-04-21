import pool from "../db";
import { QueryResult } from "pg";
import { getAllRowsSorted, getRowsByID } from "../queries";
import { COLUMN_ALIASES, IColumnAlias } from "../tables/tables";

export type IQueryRows = QueryResult["rows"] | [];

const TABLE_SHAPE: IColumnAlias = COLUMN_ALIASES.tags;
const TABLE_ID = TABLE_SHAPE.id;
const TABLE_NAME = "tags";

const getAllTags = async (): Promise<IQueryRows | unknown> => {
	const sortCol = TABLE_SHAPE.id;
	const table = TABLE_NAME;

	const data = await getAllRowsSorted(sortCol, table);

	return data as Promise<IQueryRows>;
};

const getTagByID = async (id: string): Promise<IQueryRows | unknown> => {
	const numID = parseInt(id) as number;

	const data = await getRowsByID(numID, {
		idCol: TABLE_ID,
		tableName: TABLE_NAME,
	});

	return data;
};

// this returns all tags associated w/ a given user, does NOT return 'user_tags' records
const getAllUserTags = async (
	userID: string
): Promise<IQueryRows | unknown> => {
	const query = `SELECT tags.*, user_tags.user_tag_id FROM tags INNER JOIN user_tags ON tags.tag_id = user_tags.tag_id AND user_tags.user_id = $1`;
	try {
		const data = await pool.query(query, [userID]);
		return data.rows;
	} catch (error: unknown) {
		return error;
	}
};

export { getAllTags, getAllUserTags, getTagByID };
