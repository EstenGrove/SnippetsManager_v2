import { IList, IUserList } from "../features/lists/types";
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

// saves a new 'List' for a user
const saveNewUserList = async (
	token: string,
	userID: string,
	newList: IList
): Promise<IResponse | unknown> => {
	let url = currentEnv.base + lists.saveNewUserList;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetchWithAuth(url, {
			method: "POST",
			token: token,
			body: newList,
		});
		const response = await request.json();

		console.log("response", response);

		return response;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};

// SORTING
const sortUserLists = (userLists: IUserList[]) => {
	const byPinStatus = sortBoolAscByKey("isPinned", userLists);
	// const byName = sortAlphaAscByKey("listName", byPinStatus);
	return byPinStatus;
};

const isUncategorized = (list: IUserList): boolean => {
	const { listID, listName } = list;
	const isMatch = listID === 13 && listName === "Un-Categorized";
	return isMatch;
};

export {
	// Requests
	getUserLists,
	saveNewUserList,
	// List utils
	sortUserLists,
	// List Types/Categorization
	isUncategorized,
};
