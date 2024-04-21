import { fetchWithAuth } from "./utils_auth";
import { currentEnv, tags } from "./utils_env";
import { IResponse } from "./utils_shared";

const getUserTags = async (
	token: string,
	userID: string
): Promise<IResponse | unknown> => {
	let url = currentEnv.base + tags.getAllUserTags;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetchWithAuth(url, {
			token,
		});
		const response = await request.json();
		return response;
	} catch (error: unknown) {
		return error;
	}
};

export { getUserTags };
