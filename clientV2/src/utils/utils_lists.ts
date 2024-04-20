import { fetchWithAuth } from "./utils_auth";
import { currentEnv, lists } from "./utils_env";
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

export { getUserLists };
