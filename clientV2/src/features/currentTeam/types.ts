export interface ICurrentTeam {
	teamID: string | null; // guid
	teamName: string | null;
	teamColor: string | null;
	createdDate: Date | string | null;
	updatedDate: Date | string | null;
	createdBy: string | null;
	updatedBy: string | null;
	isActive: boolean;
}

export interface ICurrentTeamUser {
	teamUserID: number | null;
	teamID: string | null; // guid
	userID: string | null; // guid
	username: string | null;
	teamName: string | null;
	isTeamLead: boolean;
	createdDate: Date | string | null;
	updatedDate: Date | string | null;
	createdBy: string | null;
	updatedBy: string | null;
	isActive: boolean;
}

export interface ITeamMember {
	teamUserID: number | null;
	teamID: string | null; // guid
	userID: string | null; // guid
	username: string | null;
	teamName: string | null;
	isTeamLead: boolean;
	createdDate: Date | string | null;
	updatedDate: Date | string | null;
	createdBy: string | null;
	updatedBy: string | null;
	isActive: boolean;
}

export type TCurrentTeamMembers = ITeamMember[];
