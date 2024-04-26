import { fetchWithAuth } from "./utils_auth";
import { currentEnv, snippets } from "./utils_env";

const getListSnippets = async (
	token: string,
	userID: string,
	listID: number
) => {
	let url = currentEnv.base + snippets.getListSnippets;
	url += "?" + new URLSearchParams({ userID, listID: String(listID) });

	try {
		const request = await fetchWithAuth(url, {
			token: token,
		});
		const response = await request.json();
		console.log("response", response);
		return response;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};

export { getListSnippets };
