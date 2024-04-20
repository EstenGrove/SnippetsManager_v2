export interface ISnippet {
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

export interface IServerSnippet {
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
