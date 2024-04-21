import express, { NextFunction, Request, Response } from "express";
import { getAllTags, getAllUserTags } from "../../db/tags/tagQueries";
import { IQueryRows } from "../../db/db";
import { normalizeTagsForServer } from "../../shared/data/normalizeTags";
import { ResponseModel } from "../../models/shared/ResponseModel";
import { IDBTagRecord } from "../../models/Tags/Tags";

const app = express();

type TQueryRows<T extends IQueryRows> = T[];

const getTags = async (req: Request, res: Response, next: NextFunction) => {
	// ##TODOS:
	// - Add error handling
	const rawTags = (await getAllTags()) as IQueryRows;
	const count = rawTags?.length ?? 0;
	const tags = normalizeTagsForServer(rawTags);
	const responseObj = new ResponseModel({
		status: "SUCCESS",
		data: {
			Tags: tags,
		},
		msg: `${count} Results were found.`,
		results: count,
		errorMsg: null,
		errorStack: null,
	});

	res.status(200).json(responseObj);
};

const getUserTags = async (req: Request, res: Response, next: NextFunction) => {
	const { userID } = req.query;
	const rawTags = (await getAllUserTags(userID as string)) as IQueryRows;
	const count = rawTags?.length ?? 0;
	const userTags = normalizeTagsForServer(rawTags);
	const responseObj = new ResponseModel({
		status: "SUCCESS",
		data: {
			// technically 'tags' not 'user_tags'
			UserTags: userTags,
		},
		msg: `${count} Results were found.`,
		results: count,
		errorMsg: null,
		errorStack: null,
	});

	res.status(200).json(responseObj);
};

app.get("/", getUserTags);

export { getTags, getUserTags };
