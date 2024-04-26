import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISnippet } from "./types";
import { IUserThunkArgs } from "../types";
import { getListSnippets } from "../../utils/utils_snippets";
import { normalizeSnippetsForClient } from "../../utils/utils_shared";

interface IListThunkArgs extends IUserThunkArgs {
	listID: number;
}

interface ISnippetsResponse {
	Data: {
		[key: string]: ISnippet[];
	};
}

const fetchListSnippets = createAsyncThunk(
	"snippets/fetchListSnippets",
	async ({ token, userID, listID }: IListThunkArgs) => {
		const data = await getListSnippets(token, userID, listID);
		const rawSnippets = data?.Data?.Snippets;
		const listSnippets = normalizeSnippetsForClient(rawSnippets);

		return listSnippets;
	}
);

export { fetchListSnippets };
