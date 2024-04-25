import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICurrentUser } from "./types";
import { TStatus } from "../types";
import { fetchUserDetails } from "./operations";

/**
 * the 'ICurrentUserSlice' is practically identical to 'ICurrentUser' interface
 */
export interface IUserAuth {
	userID: string | null;
	username: string | null;
	email: string | null;
	password: string | null;
	token: string | null;
	sessionID: string | null;
	sessionStart: string | null;
	expiry: string | null;
	isAuthenticated: boolean;
	lastRefreshedAt: string | null;
}

// IUser is just ICurrentUser
export interface IUser extends ICurrentUser {}

export interface ICurrentUserSlice {
	auth: IUserAuth;
	user: IUser;
	status: TStatus;
}

const initialState: ICurrentUserSlice = {
	auth: {
		userID: null,
		username: null,
		email: null,
		password: null,
		token: null,
		sessionID: null,
		sessionStart: null,
		expiry: null,
		isAuthenticated: false,
		lastRefreshedAt: null,
	},
	user: {
		userID: null,
		username: null,
		email: null,
		password: null,
		token: null,
		isAdmin: false,
		isTeamLead: false,
		createdDate: null,
		updatedDate: null,
		createdBy: null,
		updatedBy: null,
	},
	status: "IDLE",
};

const currentUserSlice = createSlice({
	name: "currentUser",
	initialState: initialState,
	reducers: {
		changePassword: (
			state,
			action: PayloadAction<ICurrentUserSlice["user"]["password"]>
		) => {
			state.user.password = action.payload;
		},

		setCurrentUser: (
			state,
			action: PayloadAction<ICurrentUserSlice["user"]>
		) => {
			// this will replace the current state with new one provided by the 'action.payload'
			// return action.payload;
			state.user = action.payload;
		},
		loginUser: (state, action: PayloadAction<IUserAuth>) => {
			// replace 'currentUser.auth' w/ incoming payload
			state.auth = action.payload;
			// update 'currentUser.user' states w/ incoming payload
			state.user.userID = action.payload.userID;
			state.user.username = action.payload.username;
			state.user.email = action.payload.email;
			state.user.token = action.payload.token;
		},
		logoutUser: () => {
			// reset state
			return initialState;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUserDetails.pending, (state) => {
				state.status = "PENDING";
			})
			.addCase(fetchUserDetails.fulfilled, (state, action) => {
				state.status = "FULFILLED";
				state.user = action.payload;
			})
			.addCase(fetchUserDetails.rejected, (state) => {
				state.status = "REJECTED";
			});
	},
});

// STATE SELECTORS //
export const selectCurrentUser = (
	state: RootState
): ICurrentUserSlice["user"] => {
	return state.currentUser.user;
};
export const selectCurrentUserAuth = (
	state: RootState
): ICurrentUserSlice["auth"] => {
	return state.currentUser.auth;
};
export const selectCurrentUserSlice = (state: RootState): ICurrentUserSlice => {
	return state.currentUser;
};

export const { changePassword, setCurrentUser, loginUser, logoutUser } =
	currentUserSlice.actions;

export default currentUserSlice.reducer;
