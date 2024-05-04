import pool, { TQueryRows } from "../db";
import { QueryResult } from "pg";
import { getAllRowsSorted, getRowsByID } from "../queries";
// column aliases
import { IQueryRows } from "../db";
import { COLUMN_ALIASES, IColumnAlias } from "../tables/tables";
import { IClientSnippetRecord } from "../../models/Snippets/Snippets";

/**
 * 'snippets' table
 */
const TABLE_SHAPE: IColumnAlias = COLUMN_ALIASES.snippets;
const TABLE_ID = TABLE_SHAPE.id;
const TABLE_NAME = "snippets";

const getListSnippets = async (
	listID: number
): Promise<IQueryRows | unknown> => {
	const joiner = `
  SELECT s.*, sl.list_id FROM 
    snippets s, snippet_lists sl
      WHERE s.snippet_id = sl.snippet_id
        AND sl.list_id = $1
  `;

	try {
		const results = await pool.query(joiner, [listID]);
		return results.rows;
	} catch (error) {
		return error;
	}
};

// Retrieves the snippet count for each list for a given user.
const getSnippetCounts = async (
	userID: string
): Promise<IQueryRows | unknown> => {
	const query = `
  SELECT 
	  ul.list_id, 
	  COUNT(s.snippet_id) AS snippet_count
  FROM user_lists ul
	  JOIN snippet_lists sl ON ul.list_id = sl.list_id and ul.user_id = $1
	  JOIN snippets s ON sl.snippet_id = s.snippet_id
  GROUP BY ul.list_id;
  `;

	try {
		const results = await pool.query(query, [userID]);
		const rows = results?.rows;
		console.log("rows", rows);
		return rows;
	} catch (error) {
		console.log("ERROR:", error);
		return error;
	}
};

const insertSnippet = async (snippet: IClientSnippetRecord) => {
	console.log("SNIPPET INSERT", snippet);
	const {
		snippetID: id,
		snippetName: name,
		snippetDesc: desc,
		snippetCode: codeSnippet,
		snippetOrigin: originInfo,
		createdBy,
		isActive,
		languageID,
	} = snippet;
	try {
		const columns = `snippet_name, snippet_desc, code_snippet, origin_info, created_by, is_active, language_id`;
		const values = [
			name,
			desc,
			codeSnippet,
			originInfo,
			createdBy,
			isActive,
			languageID,
		];
		const queryStr = `INSERT INTO snippets (${columns}) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
		const withReturn = `${queryStr} RETURNING snippet_id, ${columns}`;

		const results = await pool.query(withReturn, values);
		console.log("results", results);
		return results.rows;
	} catch (error) {
		return error;
	}
};

/**
 * This fn calls a PostgreSQL function that performs the follwing:
 * - Inserts a new 'snippets' record & returns it's snippet_id
 * - Inserts a new 'user_snippets' record to associate the snippet w/ a user
 * - Inserts a new 'snippet_lists' record to associate the snippet w/ a list
 * @param listID {Number} - Numeric list_id to be associated to the snippet
 * @param newSnippet {IClientSnippetRecord} - Client-formatted snippet record
 * @returns {Any|Unknown} - Currently only returns the newly created snippetID
 */
const createSnippet = async (
	listID: number,
	newSnippet: IClientSnippetRecord
) => {
	const {
		snippetName: name,
		snippetDesc: desc,
		snippetCode: codeSnippet,
		snippetOrigin: originInfo,
		languageID: langID,
		createdBy,
		isActive,
	} = newSnippet;
	try {
		const paramRefs = `$1, $2, $3, $4, $5, $6, $7, $8`;
		const paramVals = [
			name,
			desc,
			codeSnippet,
			originInfo,
			createdBy,
			isActive,
			langID,
			listID,
		];
		const sqlFn = `SELECT create_snippet(${paramRefs})`;
		const results = await pool.query(sqlFn, paramVals);
		console.log("results", results);
		return results?.rows;
	} catch (error: unknown) {
		console.log("error", error);
		return error;
	}
};

export { getListSnippets, getSnippetCounts, insertSnippet, createSnippet };
