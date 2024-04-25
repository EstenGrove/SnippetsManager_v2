import pool, { TQueryRows } from "../db";
import { QueryResult } from "pg";
import { getAllRowsSorted, getRowsByID } from "../queries";
// column aliases
import { IQueryRows } from "../db";
import { COLUMN_ALIASES, IColumnAlias } from "../tables/tables";
import {
	IClientListRecord,
	IClientUserListRecord,
	IDBListRecord,
	IDBUserListRecord,
} from "../../models/Lists/Lists";

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
		return data.rows;
	} catch (error: unknown) {
		console.log("error", error);
		return error;
	}
};

// inserts a single 'list' record in to the 'lists' table
const insertList = async (
	userID: string,
	list: IClientListRecord
): Promise<IQueryRows | unknown> => {
	const {
		// listID, // NOT NEEDED OR USED FOR NEW INSERTS
		listName,
		listDesc,
		isPinned,
		createdDate,
		// updatedDate,
		createdBy,
		// updatedBy,
		isActive,
	} = list;

	try {
		const columns = `list_name, list_desc, is_pinned, created_date, created_by, is_active`;
		const values = [
			listName,
			listDesc,
			isPinned,
			createdDate,
			createdBy,
			isActive,
		];
		const queryStr = `INSERT INTO lists (${columns}) VALUES ($1, $2, $3, $4, $5, $6)`;
		const withReturn = `${queryStr} RETURNING list_id, ${columns}`;
		const results = await pool.query(withReturn, values);
		console.log("RESULTS: ", results);
		return results.rows;
	} catch (error) {
		console.log("ERROR: ", error);
		return error;
	}
};
// inserts a single 'list' record in to the 'lists' table
const insertUserList = async (
	userID: string,
	list: IClientListRecord
): Promise<IQueryRows | unknown> => {
	const {
		listID,
		listName,
		listDesc,
		isPinned,
		createdDate,
		// updatedDate,
		createdBy,
		// updatedBy,
		isActive,
	} = list;

	try {
		const columns = `user_id, list_id, list_name, list_desc, is_pinned, created_date, created_by, is_active`;
		const values = [
			userID,
			listID,
			listName,
			listDesc,
			isPinned,
			createdDate,
			createdBy,
			isActive,
		];
		const queryStr = `INSERT INTO user_lists (${columns}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
		const withReturn = `${queryStr} RETURNING list_id, ${columns}`;
		const results = await pool.query(withReturn, values);
		console.log("RESULTS: ", results);
		return results.rows;
	} catch (error) {
		console.log("ERROR: ", error);
		return error;
	}
};

// handles inserting new 'list' & new 'user_list' record afterwards
const createNewUserList = async (
	userID: string,
	list: IClientListRecord
): Promise<IQueryRows | unknown> => {
	const {
		listID,
		listName,
		listDesc,
		isPinned,
		createdDate,
		// updatedDate,
		createdBy,
		// updatedBy,
		isActive,
	} = list;
	// 1. insert query for 'lists' table
	// 2. get 'list_id' from line 1 query
	// 3. use 'list_id' to fire off insert query for 'user_lists' table
	// 4. return results as normal or handler error
	try {
		// 'lists' QUERY
		const initialResults = (await insertList(userID, list)) as TQueryRows<
			IDBListRecord[]
		>;
		console.log("LIST INSERT RESULTS: ", initialResults);
		// 'user_lists' QUERY
		const columns = `user_id, list_id, list_name, is_pinned, created_date, created_by, is_active`;
		const newListID = initialResults?.[0]?.list_id;
		const values = [
			userID,
			newListID,
			listName,
			isPinned,
			createdDate,
			createdBy,
			isActive,
		];
		const queryStr = `INSERT INTO user_lists (${columns}) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_list_id, ${columns}`;
		const data = await pool.query(queryStr, values);
		return data.rows as IQueryRows;
	} catch (error) {
		console.log("ERROR: ", error);
		return error;
	}
};

export {
	getAllLists,
	getAllListsByUser,
	// writes
	insertList,
	insertUserList,
	createNewUserList,
};
