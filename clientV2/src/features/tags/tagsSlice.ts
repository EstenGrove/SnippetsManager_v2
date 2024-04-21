import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ITag } from "./types";
import { TStatus } from "../types";
import { fetchUserTags } from "./operations";

export interface ITagsSlice {
	userTags: ITag[] | [];
	selectedTag: ITag | object;
	status: TStatus;
}

const initialState: ITagsSlice = {
	userTags: [],
	selectedTag: {},
	status: "IDLE",
};

const tagsSlice = createSlice({
	name: "tags",
	initialState: initialState,
	reducers: {
		// syncs 'USER' tags to slice
		// - NOTE: all 'USER' tags are just 'tag' records, that have an association w/ that user!
		setUserTags: (
			state: ITagsSlice,
			action: PayloadAction<ITagsSlice["userTags"]>
		) => {
			state.userTags = action.payload;
		},
		// sets the 'selectedTag' for a given user in the slice
		setCurrentTag: (
			state: ITagsSlice,
			action: PayloadAction<ITagsSlice["selectedTag"]>
		) => {
			state.selectedTag = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUserTags.pending, (state) => {
				state.status = "PENDING";
			})
			.addCase(fetchUserTags.fulfilled, (state, action) => {
				state.status = "FULFILLED";
				state.userTags = action.payload;
			})
			.addCase(fetchUserTags.rejected, (state) => {
				state.status = "REJECTED";
			});
	},
});

export const selectTags = (state: RootState) => state.tags.userTags;

export const { setUserTags, setCurrentTag } = tagsSlice.actions;

export default tagsSlice.reducer;
