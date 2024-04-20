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
	ListID: IDBUserListRecord["list_id"];
	Name: IDBUserListRecord["list_name"];
	Desc: IDBUserListRecord["list_desc"];
	IsPinned: IDBUserListRecord["is_pinned"];
	CreatedDate: IDBListRecord["created_date"];
	UpdatedDate: IDBListRecord["updated_date"];
	CreatedBy: IDBListRecord["created_by"];
	UpdatedBy: IDBListRecord["updated_by"];
	IsActive: IDBListRecord["is_active"];
}

// USER LISTS
export interface IDBUserListRecord {
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
export interface IServerUserListRecord {
	ListID: IDBUserListRecord["list_id"];
	Name: IDBUserListRecord["list_name"];
	Desc: IDBUserListRecord["list_desc"];
	IsPinned: IDBUserListRecord["is_pinned"];
	CreatedDate: IDBUserListRecord["created_date"];
	UpdatedDate: IDBUserListRecord["updated_date"];
	CreatedBy: IDBUserListRecord["created_by"];
	UpdatedBy: IDBUserListRecord["updated_by"];
	IsActive: IDBUserListRecord["is_active"];
}
