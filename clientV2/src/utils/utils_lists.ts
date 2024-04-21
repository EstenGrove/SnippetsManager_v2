import { IUserList } from "../features/lists/types";
import { fetchWithAuth } from "./utils_auth";
import { currentEnv, lists } from "./utils_env";
import { sortAlphaAscByKey, sortBoolAscByKey } from "./utils_misc";
import { IResponse } from "./utils_shared";

const getUserLists = async (
	token: string,
	userID: string
): Promise<IResponse | undefined> => {
	let url = currentEnv.base + lists.getAllUserLists;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetchWithAuth(url, {
			token,
		});
		const response = await request.json();
		return response;
	} catch (error: unknown) {
		console.error(error);
	}
};

// SORTING
const sortUserLists = (userLists: IUserList[]) => {
	const byPinStatus = sortBoolAscByKey("isPinned", userLists);
	const byName = sortAlphaAscByKey("listName", byPinStatus);
	return byName;
};

export {
	// Requests
	getUserLists,
	// List utils
	sortUserLists,
};
