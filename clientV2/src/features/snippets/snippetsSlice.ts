import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISnippet } from "../../utils/types/snippets";
import { ITag } from "../../utils/types/tags";
import { RootState } from "../../store/store";
import { TStatus } from "../types";
import { fetchListSnippets } from "./operations";

export interface ISelectedSnippet {
	snippet: ISnippet;
	tags: ITag[];
}

export interface ISnippetsSlice {
	status: TStatus;
	userSnippets: ISnippet[];
	selectedSnippet: {
		snippet: ISnippet;
		tags: ITag[];
	};
}

const initialState: ISnippetsSlice = {
	status: "IDLE",
	userSnippets: [],
	selectedSnippet: {
		snippet: {},
		tags: [],
	},
};

const snippetsSlice = createSlice({
	name: "snippets",
	initialState: initialState,
	reducers: {
		setSnippets: (state: ISnippetsSlice, action) => {
			state.userSnippets = action.payload;
		},
		setCurrentSnippet: (state: ISnippetsSlice, action) => {
			// do something
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchListSnippets.pending, (state: ISnippetsSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				fetchListSnippets.fulfilled,
				(
					state: ISnippetsSlice,
					action: PayloadAction<ISnippetsSlice["userSnippets"]>
				) => {
					state.status = "FULFILLED";
					state.userSnippets = action.payload;
				}
			)
			.addCase(fetchListSnippets.rejected, (state: ISnippetsSlice) => {
				state.status = "REJECTED";
			});
	},
});

// STATE SELECTORS //
export const selectCurrentSnippet = (state: RootState) =>
	state.snippets.selectedSnippet;

export const selectUserSnippets = (state: RootState) =>
	state.snippets.userSnippets;

export const { setSnippets, setCurrentSnippet } = snippetsSlice.actions;

export default snippetsSlice.reducer;
