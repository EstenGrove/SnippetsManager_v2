import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserList } from "../lists/types";
import { ISnippet } from "../snippets/types";
import { ITag } from "../tags/types";
import { TStatus } from "../types";

export interface IFavesSlice {
	lists: IUserList[] | [];
	snippets: ISnippet[] | [];
	tags: ITag[] | [];
	status: TStatus;
}

export interface IFavePayload {
	isFave: boolean;
	list: IUserList;
}

const initialState: IFavesSlice = {
	lists: [],
	snippets: [],
	tags: [],
	status: "IDLE",
};

const favesSlice = createSlice({
	name: "faves",
	initialState: initialState,
	reducers: {
		toggleFaveList: (
			state: IFavesSlice,
			action: PayloadAction<IFavePayload>
		) => {
			const list: IUserList = action.payload.list;
			const isFave: boolean = action.payload.isFave;
			const listID: number = list.listID;
			// if we're marking it as a fave, then just add it to the list
			if (isFave) {
				state.lists = [...state.lists, list];
			} else {
				state.lists = [...state.lists.filter((list) => list.listID !== listID)];
			}
		},
	},
});

export const selectFaves = (state: RootState) => state.faves;

export default favesSlice.reducer;
