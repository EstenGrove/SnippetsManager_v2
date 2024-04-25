export interface IClientSnippetRecord {
	snippetID: number;
	snippetName: string;
	snippetDesc: string;
	snippetCode: string;
	snippetOrigin: string | null;
	languageID: number;
	isFave?: boolean;
	isActive: boolean;
	createdDate: Date | string;
	updatedDate: Date | string | null;
	createdBy: string | null;
	updatedBy: string | null;
}

export interface IServerSnippetRecord {
	SnippetID: number;
	LanguageID: number;
	Name: string;
	Desc: string;
	CodeSnippet: string;
	OriginInfo: string;
	CreatedDate: Date | string;
	UpdatedDate: Date | string | null;
	CreatedBy: string;
	UpdatedBy: string | null;
	IsActive: boolean;
}
export interface IDBSnippetRecord {
	snippet_id: number;
	snippet_name: string;
	snippet_desc: string;
	code_snippet: string;
	origin_info: string;
	language_id: number;
	created_date: string;
	updated_date: string | null;
	created_by: string;
	updated_by: string | null;
	is_active: boolean;
}
