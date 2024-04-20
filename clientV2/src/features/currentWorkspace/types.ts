export interface ICurrentWorkspace {
	workspaceID: string | null; // guid???
	name: string;
	createdDate: Date | string;
	updatedDate: Date | string | null;
	createdBy: string;
	updatedBy: string | null;
	isActive: boolean;
}
