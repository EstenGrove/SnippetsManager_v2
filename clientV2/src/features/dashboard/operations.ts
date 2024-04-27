import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserThunkArgs } from "../types";
import {
	formatSnippetCount,
	getSnippetCounts,
} from "../../utils/utils_snippets";

const fetchSnippetCounts = createAsyncThunk(
	"dashboard/fetchSnippetCounts",
	async ({ token, userID }: IUserThunkArgs) => {
		const data = await getSnippetCounts(token, userID);
		const normal = data?.Data.SnippetCounts;
		const formatted = formatSnippetCount(normal);
		return formatted;
	}
);

export { fetchSnippetCounts };
