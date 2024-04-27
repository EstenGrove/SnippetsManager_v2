import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { TStatus } from "../types";
import { ISnippetCounts } from "./types";
import { fetchSnippetCounts } from "./operations";

export interface IDashboardSlice {
	snippetCounts: ISnippetCounts | object;
	status: TStatus;
}

const initialState: IDashboardSlice = {
	snippetCounts: {},
	status: "IDLE",
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchSnippetCounts.pending, (state) => {
				state.status = "PENDING";
			})
			.addCase(
				fetchSnippetCounts.fulfilled,
				(
					state: IDashboardSlice,
					action: PayloadAction<IDashboardSlice["snippetCounts"]>
				) => {
					state.status = "FULFILLED";
					state.snippetCounts = action.payload;
				}
			)
			.addCase(fetchSnippetCounts.rejected, (state) => {
				state.status = "REJECTED";
			});
	},
});

export const selectSnippetCounts = (state: RootState) =>
	state.dashboard.snippetCounts;

export default dashboardSlice.reducer;
