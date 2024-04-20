import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICurrentWorkspace } from "./types";
import { TTheme } from "../../context/ThemeContext";

export interface ICurrentWorkspaceSlice extends ICurrentWorkspace {
	name: string;
	workspaceSnippets: object[]; // ?????
	workspaceLists: object[]; // ?????
	workspaceTags: object[]; // ?????
	workspaceSettings: {
		theme: TTheme;
	};
}

const initialState = {};

const currentWorkspaceSlice = createSlice({
	name: "currentWorkspace",
	initialState: initialState,
	reducers: {
		setCurrentWorkspace: (
			_state,
			action: PayloadAction<ICurrentWorkspaceSlice>
		) => {
			// this will replace the current state with new one provided by the 'action.payload'
			return action.payload;
		},
	},
});
