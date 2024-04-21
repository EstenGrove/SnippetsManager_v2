export interface IDBTagRecord {
	tag_id: string;
	tag_name: string;
	tag_color: string;
	is_pinned: boolean;
	created_date: string;
	updated_date: string | null;
	created_by: string;
	updated_by: string | null;
	is_active: boolean;
}

export interface IServerTagRecord {
	TagID: IDBTagRecord["tag_id"];
	Name: IDBTagRecord["tag_name"];
	Color: IDBTagRecord["tag_color"];
	IsPinned: IDBTagRecord["is_pinned"];
	CreatedDate: IDBTagRecord["created_date"];
	UpdatedDate: IDBTagRecord["updated_date"];
	CreatedBy: IDBTagRecord["created_by"];
	UpdatedBy: IDBTagRecord["updated_by"];
	IsActive: IDBTagRecord["is_active"];
}
