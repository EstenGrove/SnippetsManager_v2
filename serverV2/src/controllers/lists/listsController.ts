import express, { Request, Response, NextFunction } from "express";
import { IQueryRows, getAllListsByUser } from "../../db/lists/listQueries";
import { normalizeUserListsForServer } from "../../shared/data/normalizeLists";
import { IServerUserListRecord } from "../../models/Lists/Lists";
import { ResponseModel } from "../../models/shared/ResponseModel";

const app = express();

const getUserLists = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { userID } = req.query;
	const rawLists = (await getAllListsByUser(userID as string)) as IQueryRows;
	const count = rawLists?.length ?? 0;
	const userLists: IServerUserListRecord[] =
		normalizeUserListsForServer(rawLists);
	const responseObj = new ResponseModel({
		status: "SUCCESS",
		data: {
			UserLists: userLists,
		},
		msg: `${count} Results were found.`,
		results: count,
		errorMsg: null,
		errorStack: null,
	});

	res.status(200).json(responseObj);
};

app.get("/", getUserLists);

export { getUserLists };
