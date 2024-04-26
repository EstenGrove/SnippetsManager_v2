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

export { getListSnippets, insertSnippet };
