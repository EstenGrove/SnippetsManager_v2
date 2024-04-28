import { ISnippetCounts } from "../features/dashboard/types";
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
		return response;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};
// Retrieves the snippet counts for each list for given user
const getSnippetCounts = async (token: string, userID: string) => {
	let url = currentEnv.base + snippets.getSnippetCountsByList;
	url += "?" + new URLSearchParams({ userID });

	try {
		const request = await fetchWithAuth(url, {
			token: token,
		});
		const response = await request.json();
		return response;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};

// PROCESSING SNIPPET-RELATED DATA //

type TCounts = {
	[key: number]: [{ ListID: number; Count: number }];
};

type TCountResults = {
	[key: number]: {
		count: number;
		listID: number;
	};
};

const formatSnippetCount = (counts: TCounts): TCountResults => {
	const results: TCountResults = {};
	for (const [key, arr] of Object.entries(counts)) {
		results[key as keyof object] = {
			count: arr?.[0]?.Count,
			listID: Number(key),
		};
	}
	return results as TCountResults;
};

// Returns the count of snippets, given a listID
const getCountFromData = (listID: number, counts: ISnippetCounts): number => {
	const entry = counts?.[listID];
	if (entry) {
		return entry?.count ?? 0;
	} else {
		return 0;
	}
};

export {
	getListSnippets,
	getSnippetCounts,
	// formatting
	formatSnippetCount,
	getCountFromData,
};
