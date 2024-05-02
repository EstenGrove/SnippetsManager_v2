import express, { Request, Response, NextFunction } from "express";
import { normalizeUserListsForServer } from "../../shared/data/normalizeLists";
import { ResponseModel } from "../../models/shared/ResponseModel";
import { IQueryRows } from "../../db/db";
import { getAllLanguages } from "../../db/langs/langQueries";
import { normalizeLanguagesForServer } from "../../shared/data/normalizeLangs";

const app = express();

const getLanguages = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// ##TODOS:
	// - Add error handling here!!!
	const rawLangs = (await getAllLanguages()) as IQueryRows;
	const rowCount = rawLangs?.length ?? 0;
	const langs = normalizeLanguagesForServer(rawLangs);
	const responseObj = new ResponseModel({
		status: "SUCCESS",
		data: {
			Languages: langs,
		},
		msg: `${rowCount} Results were found.`,
		results: rowCount,
		errorMsg: null,
		errorStack: null,
	});

	res.status(200).json(responseObj);
};

// declare base route/path & it's controller
app.get("/", getLanguages);

export { getLanguages };
