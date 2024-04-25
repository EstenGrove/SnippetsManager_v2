import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { IUserList } from "./types";
import { TStatus } from "../types";
import { ISnippet } from "../snippets/types";
import { createNewUserList, fetchUserLists } from "./operations";
import { updateAt } from "../../utils/utils_misc";

export interface ICurrentList {
	list: IUserList | object;
	snippets: ISnippet[] | [];
}

export interface IListSlice {
	userLists: IUserList[] | [];
	currentList: ICurrentList;
	status: TStatus;
}

const initialState: IListSlice = {
	status: "IDLE",
	userLists: [],
	currentList: {
		list: {},
		snippets: [],
	},
};

const listsSlice = createSlice({
	name: "lists",
	initialState: initialState,
	reducers: {
		setUserLists: (
			state: IListSlice,
			action: PayloadAction<IListSlice["userLists"]>
		) => {
			state.userLists = action.payload;
		},
		setCurrentList: (
			state: IListSlice,
			action: PayloadAction<IListSlice["currentList"]>
		) => {
			state.currentList = action.payload;
		},
		toggleIsPinned: (state, action) => {
			const currentLists = [...state.userLists];
			const isPinned = action.payload.isPinned;
			const listID = action.payload.listID;
			const curIdx = currentLists.findIndex((list) => list.listID === listID);
			const list = currentLists[curIdx];
			state.userLists = updateAt(currentLists, curIdx, {
				...list,
				isPinned: isPinned,
			});
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUserLists.pending, (state: IListSlice) => {
				state.status = "PENDING";
			})
			.addCase(
				fetchUserLists.fulfilled,
				(state: IListSlice, action: PayloadAction<IUserList[] | []>) => {
					state.status = "FULFILLED";
					state.userLists = action.payload;
				}
			)
			.addCase(fetchUserLists.rejected, (state: IListSlice) => {
				state.status = "REJECTED";
			})
			.addCase(createNewUserList.pending, (state) => {
				state.status = "PENDING";
			})
			.addCase(createNewUserList.fulfilled, (state, action) => {
				state.status = "FULFILLED";
				state.userLists = [...state.userLists, action.payload];
			})
			.addCase(createNewUserList.rejected, (state) => {
				state.status = "REJECTED";
			});

		// USER LIST SNIPPETS (eg. snippets for the current list)
		// .addCase(fetchUserListSnippets.pending, (state, action) => {
		// 	state.status = "PENDING";
		// })
		// .addCase(fetchUserListSnippets.fulfilled, (state, action) => {
		// 	state.status = "FULFILLED";
		// 	state.currentList.snippets = action.payload;
		// })
		// .addCase(fetchUserListSnippets.rejected, (state, action) => {
		// 	state.status = "REJECTED";
		// });
	},
});

export const selectUserLists = (state: RootState) => state.lists.userLists;
export const selectCurrentList = (state: RootState) => state.lists.currentList;

export const { setUserLists, setCurrentList, toggleIsPinned } =
	listsSlice.actions;

export default listsSlice.reducer;
