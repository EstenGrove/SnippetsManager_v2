import {
	IDBSnippetCount,
	IDBSnippetRecord,
	IServerSnippetCount,
} from "../../models/Snippets/Snippets";
import { groupBy } from "./processing";

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

// Counts
const normalizeSnippetCountForServer = (
	dbCount: IDBSnippetCount
): IServerSnippetCount => {
	const serverRecord = {
		ListID: dbCount?.list_id,
		Count: Number(dbCount?.snippet_count),
	};
	return serverRecord;
};
const normalizeSnippetCountsForServer = (
	dbCount: IDBSnippetCount[]
): IServerSnippetCount[] => {
	if (!dbCount || dbCount?.length <= 0) return [];
	const serverRecords = dbCount.map((dbRecord) =>
		normalizeSnippetCountForServer(dbRecord)
	);

	return serverRecords;
};

const normalizeGroupedCounts = (dbCounts: IDBSnippetCount[]) => {
	const normal = normalizeSnippetCountsForServer(dbCounts);
	const grouped = groupBy("ListID", normal);
	return grouped;
};

export {
	// Snippet Records
	normalizeSnippetForServer,
	normalizeSnippetsForServer,
	// Counts per list
	normalizeSnippetCountForServer,
	normalizeSnippetCountsForServer,
	normalizeGroupedCounts,
};
