import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ILanguage } from "./types";
import { TStatus } from "../types";

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
		//
		//
	},
});

export const selectLangs = (state: RootState) => state.langs.languages;

export const { setLanguages } = langsSlice.actions;

export default langsSlice.reducer;
