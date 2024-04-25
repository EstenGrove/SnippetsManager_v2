import { IDBSnippetRecord } from "../../models/Snippets/Snippets";

const normalizeSnippetForServer = (dbSnippet: IDBSnippetRecord) => {
	const serverTag = {
		SnippetID: dbSnippet.snippet_id,
		Name: dbSnippet.snippet_name,
		Desc: dbSnippet.snippet_desc,
		CodeSnippet: dbSnippet.code_snippet,
		OriginInfo: dbSnippet.origin_info,
		CreatedDate: dbSnippet.created_date,
		UpdatedDate: dbSnippet.updated_date,
		CreatedBy: dbSnippet.created_by,
		UpdatedBy: dbSnippet.updated_by,
		IsActive: dbSnippet.is_active,
		LanguageID: dbSnippet.language_id,
	};

	return serverTag;
};

const normalizeSnippetsForServer = (dbSnippets: IDBSnippetRecord[]) => {
	if (!dbSnippets || dbSnippets?.length <= 0) return [];
	const serverTags = dbSnippets.map((tagRecord) =>
		normalizeSnippetForServer(tagRecord)
	);

	return serverTags;
};

export { normalizeSnippetForServer, normalizeSnippetsForServer };
