import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllLanguages } from "../../utils/utils_langs";
import { normalizeLangsForClient } from "../../utils/utils_shared";

const fetchLangs = createAsyncThunk("languages/fetchLangs", async () => {
	const response = await fetchAllLanguages();
	const normal = normalizeLangsForClient(response?.Data?.Languages ?? []);
	return normal;
});

export { fetchLangs };
