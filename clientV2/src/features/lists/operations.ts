import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserThunkArgs, TUserThunkArgs } from "../types";
import { IList, IServerUserList } from "./types";
// utils
import { getUserLists, saveNewUserList } from "../../utils/utils_lists";
import {
	IResponse,
	normalizeUserListForClient,
	normalizeUserListsForClient,
} from "../../utils/utils_shared";

export interface IListThunkArgs extends IUserThunkArgs {
	newList: IList;
}

const fetchUserLists = createAsyncThunk(
	"lists/fetchUserLists",
	async ({ token, userID }: TUserThunkArgs) => {
		const data = await getUserLists(token, userID);
		const rawLists = data?.Data?.UserLists as IServerUserList[];
		const userLists = normalizeUserListsForClient(
			rawLists as IServerUserList[]
		);
		return userLists;
	}
);

const createNewUserList = createAsyncThunk(
	"lists/createNewUserList",
	async ({ token, userID, newList }: IListThunkArgs) => {
		const data = (await saveNewUserList(token, userID, newList)) as IResponse;
		const rawList = data?.Data?.NewList as IServerUserList;
		const userList = normalizeUserListForClient(rawList);

		return userList;
	}
);

export { fetchUserLists, createNewUserList };
