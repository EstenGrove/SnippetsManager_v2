import express, { Request, Response, NextFunction } from "express";
import {
	createNewUserList,
	getAllListsByUser,
} from "../../db/lists/listQueries";
import { normalizeUserListsForServer } from "../../shared/data/normalizeLists";
import {
	IClientListRecord,
	IServerUserListRecord,
} from "../../models/Lists/Lists";
import { ResponseModel } from "../../models/shared/ResponseModel";
import { IQueryRows } from "../../db/db";

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

const saveNewUserList = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// ##TODOS:
	// - Add error handling here!!!
	const list = req.body as IClientListRecord;
	const userID = req.query.userID as string;
	const results = (await createNewUserList(userID, list)) as IQueryRows;
	const rowCount = results?.length ?? 0;
	console.log("results(controller): ", results);

	const responseObj = new ResponseModel({
		status: "SUCCESS",
		data: {
			Lists: results,
		},
		msg: `Inserted 1 new user list`,
		results: rowCount,
		errorMsg: null,
		errorStack: null,
	});

	res.status(200).json(responseObj);
};

app.get("/", getUserLists);
app.post("/", saveNewUserList);

export { getUserLists, saveNewUserList };
