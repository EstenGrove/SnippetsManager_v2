import express from "express";
import { NextFunction, Request, Response } from "express";
import { ResponseModel } from "../../models/shared/ResponseModel";
import {
	getListSnippets,
	insertSnippet,
} from "../../db/snippets/snippetQueries";
import { normalizeSnippetsForServer } from "../../shared/data/normalizeSnippets";
import { IDBSnippetRecord } from "../../models/Snippets/Snippets";

const app = express();

const getSnippetsByList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const listID = Number(req.query.listID);
	const listSnippets = await getListSnippets(listID);
	const normalSnippets = normalizeSnippetsForServer(
		listSnippets as IDBSnippetRecord[]
	);
	const rowCount = normalSnippets?.length ?? 0;
	const responseObj = new ResponseModel({
		status: "SUCCESS",
		data: {
			Snippets: normalSnippets,
		},
		msg: `${rowCount} results found.`,
		results: rowCount,
		errorMsg: null,
		errorStack: null,
	});
	res.status(200).json(responseObj);
};

const saveNewSnippet = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const snippet = req.body;

	// QUERY HANDLING
	const results = await insertSnippet(snippet);
	const normalSnippet = normalizeSnippetsForServer(
		results as IDBSnippetRecord[]
	);
	console.log("SNIPPET RESULTS: ", results);
	console.log("normalSnippet", normalSnippet);
	// RESPONSE HANDLING
	const responseObj = new ResponseModel({
		status: "SUCCESS",
		data: {
			Snippet: normalSnippet,
		},
		msg: "Received the request with post body",
		results: 0,
		errorMsg: null,
		errorStack: null,
	});
	res.status(200).json(responseObj);
};

// GETS
app.get("/", getSnippetsByList);
// POSTS
app.post("/", saveNewSnippet);

export { getSnippetsByList, saveNewSnippet };
