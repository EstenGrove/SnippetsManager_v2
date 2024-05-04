import express from "express";
import { NextFunction, Request, Response } from "express";
import { ResponseModel } from "../../models/shared/ResponseModel";
import {
	createSnippet,
	getListSnippets,
	getSnippetCounts,
	insertSnippet,
} from "../../db/snippets/snippetQueries";
import {
	normalizeGroupedCounts,
	normalizeSnippetsForServer,
} from "../../shared/data/normalizeSnippets";
import {
	IDBSnippetCount,
	IDBSnippetRecord,
} from "../../models/Snippets/Snippets";

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

const getSnippetsCountByList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userID = req.query.userID as string;
	const counts = (await getSnippetCounts(userID)) as Array<IDBSnippetCount>;
	const grouped = normalizeGroupedCounts(counts as Array<IDBSnippetCount>);
	const rowCount = counts?.length ?? 0;
	const responseObj = new ResponseModel({
		status: "SUCCESS",
		data: {
			SnippetCounts: grouped,
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
	const listID = req.query?.listID ?? null;
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

const createNewSnippet = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const list = req.query?.listID ?? "";
	const snippet = req.body;

	// Check for 'listID' and 'snippet' before calling fn
	if (!list) {
		const failedResp = new ResponseModel({
			status: "FAILED",
			msg: "No listID was provided!",
		});
		return res.status(400).json(failedResp);
	}
	const listID: number = Number(list);
	const results = await createSnippet(listID, snippet);
	console.log("results", results);

	const responseObj = new ResponseModel({
		status: "SUCCESS",
		msg: "New snippet & associations created (eg. list & user associations).",
		data: {
			NewSnippet: results,
		},
		results: "3 records were inserted successfully!",
	});
	res.status(200).json(responseObj);
};

// GETS
app.get("/", getSnippetsByList);
app.get("/", getSnippetsCountByList);
// POSTS
app.post("/", saveNewSnippet);

export { getSnippetsByList, getSnippetsCountByList, saveNewSnippet };
