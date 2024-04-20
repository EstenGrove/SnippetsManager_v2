import { createAsyncThunk } from "@reduxjs/toolkit";
import { TUserThunkArgs } from "../types";
import { IServerUserList } from "./types";
// utils
import { getUserLists } from "../../utils/utils_lists";
import { normalizeUserListsForClient } from "../../utils/utils_shared";

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

export { fetchUserLists };
