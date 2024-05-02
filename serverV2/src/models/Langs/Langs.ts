export interface IDBLangRecord {
	language_id: number;
	language_name: string;
	language_desc: string;
	language_extension: string;
	language_alias: string;
	created_date: string;
	updated_date: string | null;
	created_by: string;
	updated_by: string | null;
	is_active: boolean;
}

export interface IServerLangRecord {
	LanguageID: IDBLangRecord["language_id"];
	Name: IDBLangRecord["language_name"];
	Alias: IDBLangRecord["language_alias"];
	Desc: IDBLangRecord["language_desc"];
	Extension: IDBLangRecord["language_extension"];
	CreatedDate: IDBLangRecord["created_date"];
	UpdatedDate: IDBLangRecord["updated_date"];
	CreatedBy: IDBLangRecord["created_by"];
	UpdatedBy: IDBLangRecord["updated_by"];
	IsActive: IDBLangRecord["is_active"];
}
