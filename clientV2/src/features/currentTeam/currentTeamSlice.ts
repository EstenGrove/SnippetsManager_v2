import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ICurrentTeam, ICurrentTeamUser, ITeamMember } from "./types";

interface ICurrentTeamSlice {
	team: ICurrentTeam;
	teamUser: ICurrentTeamUser;
	teamMembers: ITeamMember[] | [];
}

const initialState: ICurrentTeamSlice = {
	team: {
		teamID: null,
		teamName: null,
		teamColor: null,
		createdDate: null,
		updatedDate: null,
		createdBy: null,
		updatedBy: null,
		isActive: false,
	},
	teamUser: {
		teamUserID: null,
		teamID: null,
		userID: null,
		username: null,
		teamName: null,
		isTeamLead: false,
		createdDate: null,
		updatedDate: null,
		createdBy: null,
		updatedBy: null,
		isActive: false,
	},
	teamMembers: [],
};

const currentTeamSlice = createSlice({
	name: "currentTeam",
	initialState: initialState,
	reducers: {
		// syncs 'team' to slice
		setCurrentTeam: (
			state: ICurrentTeamSlice,
			action: PayloadAction<ICurrentTeamSlice["team"]>
		) => {
			state.team = action.payload;
		},
		// syncs the current 'team user' to slice
		setCurrentTeamUser: (
			state: ICurrentTeamSlice,
			action: PayloadAction<ICurrentTeamSlice["teamUser"]>
		) => {
			state.teamUser = action.payload;
		},
		// syncs the current 'team user' to slice
		setCurrentTeamMembers: (
			state: ICurrentTeamSlice,
			action: PayloadAction<ICurrentTeamSlice["teamMembers"]>
		) => {
			state.teamMembers = action.payload;
		},
	},
});

// STATE SELECTORS //
export const selectCurrentTeam = (state: RootState) => state.currentTeam.team;
export const selectCurrentTeamUser = (state: RootState) =>
	state.currentTeam.teamUser;
export const selectCurrentTeamMembers = (state: RootState) =>
	state.currentTeam.teamMembers;

export const { setCurrentTeam } = currentTeamSlice.actions;

export default currentTeamSlice.reducer;
