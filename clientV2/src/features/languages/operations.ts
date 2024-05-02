import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllLanguages } from "../../utils/utils_langs";
import { normalizeLangsForClient } from "../../utils/utils_shared";

const fetchLangs = createAsyncThunk(
	"languages/fetchLangs",
	async (token: string) => {
		const response = await fetchAllLanguages(token);
		const normal = normalizeLangsForClient(response?.Data?.Languages ?? []);
		return normal;
	}
);

export { fetchLangs };
