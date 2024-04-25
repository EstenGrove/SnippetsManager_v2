// LISTS
export interface IDBListRecord {
	list_id: string;
	list_name: string;
	list_desc: string;
	is_pinned: boolean;
	created_date: string;
	updated_date: string | null;
	created_by: string;
	updated_by: string | null;
	is_active: boolean;
}
export interface IServerListRecord {
	ListID: IDBListRecord["list_id"];
	Name: IDBListRecord["list_name"];
	Desc: IDBListRecord["list_desc"];
	IsPinned: IDBListRecord["is_pinned"];
	CreatedDate: IDBListRecord["created_date"];
	UpdatedDate: IDBListRecord["updated_date"];
	CreatedBy: IDBListRecord["created_by"];
	UpdatedBy: IDBListRecord["updated_by"];
	IsActive: IDBListRecord["is_active"];
}

/**
 * 'IList' server-side version
 */
export interface IClientListRecord {
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

/**
 * 'IUserList' server-side version
 */
export interface IClientUserListRecord {
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

// USER LISTS
export interface IDBUserListRecord {
	user_list_id: string;
	user_id: string;
	list_id: string;
	list_name: string;
	is_pinned: boolean;
	created_date: string;
	updated_date: string | null;
	created_by: string;
	updated_by: string | null;
	is_active: boolean;
}
export interface IServerUserListRecord {
	ListID: IDBUserListRecord["list_id"];
	UserListID: IDBUserListRecord["user_list_id"];
	UserID: IDBUserListRecord["user_id"];
	Name: IDBUserListRecord["list_name"];
	IsPinned: IDBUserListRecord["is_pinned"];
	CreatedDate: IDBUserListRecord["created_date"];
	UpdatedDate: IDBUserListRecord["updated_date"];
	CreatedBy: IDBUserListRecord["created_by"];
	UpdatedBy: IDBUserListRecord["updated_by"];
	IsActive: IDBUserListRecord["is_active"];
}
