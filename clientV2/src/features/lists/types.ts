export type TList = IList | object;
export type TUserList = IUserList | object;

export interface IList {
	listID: number;
	listName: string;
	listDesc: string | null;
	isPinned: boolean;
	createdDate: Date | string;
	updatedDate: Date | string | null;
	createdBy: string;
	updatedBy: string | null;
	isActive: boolean;
}

export interface IUserList {
	userListID: number;
	userID: string;
	listID: number;
	listName: string;
	isPinned: boolean;
	createdDate: Date | string;
	updatedDate: Date | string | null;
	createdBy: string;
	updatedBy: string | null;
	isActive: boolean;
}

// Server format
export interface IServerList {
	ListID: number;
	Name: string;
	Desc: string;
	IsPinned: boolean;
	CreatedDate: Date | string;
	UpdatedDate: Date | string;
	CreatedBy: string;
	UpdatedBy: string;
	IsActive: boolean;
}

export interface IServerUserList {
	UserListID: number;
	UserID: string;
	ListID: number;
	Name: string;
	IsPinned: boolean;
	CreatedDate: Date | string;
	UpdatedDate: Date | string | null;
	CreatedBy: string;
	UpdatedBy: string | null;
	IsActive: boolean;
}
