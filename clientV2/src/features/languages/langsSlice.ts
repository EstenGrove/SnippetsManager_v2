import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ILanguage } from "./types";
import { TStatus } from "../types";
import { fetchLangs } from "./operations";

export interface ILangsSlice {
	languages: ILanguage[] | [];
	status: TStatus;
}

const initialState: ILangsSlice = {
	languages: [],
	status: "IDLE",
};

const langsSlice = createSlice({
	name: "langs",
	initialState: initialState,
	reducers: {
		setLanguages: (
			state: ILangsSlice,
			action: PayloadAction<ILangsSlice["languages"]>
		) => {
			state.languages = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchLangs.pending, (state) => {
				state.status = "PENDING";
			})
			.addCase(fetchLangs.fulfilled, (state, action) => {
				state.status = "FULFILLED";
				state.languages = action.payload;
			})
			.addCase(fetchLangs.rejected, (state) => {
				state.status = "REJECTED";
			});
	},
});

export const selectLangs = (state: RootState) => state.langs.languages;

export const { setLanguages } = langsSlice.actions;

export default langsSlice.reducer;
