// SERVER SHAPES

export interface IServerUserTag {
	UserTagID: number;
	TagID: number;
	UserID: string;
	CreatedDate: Date | string;
	UpdatedDate: Date | string | null;
	CreatedBy: string;
	UpdatedBy: string | null;
	IsActive: boolean;
}
export interface IServerTag {
	TagID: number;
	TagName: string;
	TagColor: string;
	IsPinned: boolean;
	CreatedDate: Date | string;
	UpdatedDate: Date | string | null;
	CreatedBy: string;
	UpdatedBy: string | null;
	IsActive: boolean;
}

// CLIENT SHAPES
export interface ITag {
	tagID: number;
	tagName: string;
	tagColor: string | null;
	isPinned: boolean;
	createdDate: Date | string;
	updatedDate: Date | string | null;
	createdBy: string;
	updatedBy: string | null;
	isActive: boolean;
}

export interface IUserTag {
	userTagID: number;
	userID: string;
	tagID: number;
	//
	tagName: string;
	tagColor: string | null;
	isPinned: boolean;
	//
	createdDate: Date | string;
	updatedDate: Date | string | null;
	createdBy: string;
	updatedBy: string | null;
	isActive: boolean;
}
