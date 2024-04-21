import { IDBTagRecord, IServerTagRecord } from "../../models/Tags/Tags";

const normalizeTagForServer = (dbTag: IDBTagRecord): IServerTagRecord => {
	const serverTag = {
		TagID: dbTag.tag_id,
		Name: dbTag.tag_name,
		Color: dbTag.tag_color,
		IsPinned: dbTag.is_pinned,
		CreatedDate: dbTag.created_date,
		UpdatedDate: dbTag.updated_date,
		CreatedBy: dbTag.created_by,
		UpdatedBy: dbTag.updated_by,
		IsActive: dbTag.is_active,
	};

	return serverTag;
};

const normalizeTagsForServer = (dbTags: IDBTagRecord[]): IServerTagRecord[] => {
	if (!dbTags || dbTags.length <= 0) return [];
	const serverTags = dbTags.map((tagRecord) =>
		normalizeTagForServer(tagRecord)
	);

	return serverTags;
};

export {
	// SINGLE RECORD UTILS
	normalizeTagForServer,
	// MULTI-RECORD UTILS
	normalizeTagsForServer,
};
