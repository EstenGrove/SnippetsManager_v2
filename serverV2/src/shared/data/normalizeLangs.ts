import { IDBLangRecord, IServerLangRecord } from "../../models/Langs/Langs";

const normalizeLanguageForServer = (
	dbLang: IDBLangRecord
): IServerLangRecord => {
	const serverLang = {
		LanguageID: dbLang.language_id,
		Name: dbLang.language_name,
		Alias: dbLang.language_alias,
		Desc: dbLang.language_desc,
		Extension: dbLang.language_extension,
		CreatedDate: dbLang.created_date,
		UpdatedDate: dbLang.updated_date,
		CreatedBy: dbLang.created_by,
		UpdatedBy: dbLang.updated_by,
		IsActive: dbLang.is_active,
	};

	return serverLang;
};

const normalizeLanguagesForServer = (
	dbLangs: IDBLangRecord[]
): IServerLangRecord[] => {
	if (!dbLangs || dbLangs?.length <= 0 || !Array.isArray(dbLangs)) return [];
	const serverLangs = dbLangs.map((langRecord) =>
		normalizeLanguageForServer(langRecord)
	);

	return serverLangs;
};

export {
	// SINGLE RECORD UTILS
	normalizeLanguageForServer,
	// MULTI-RECORD UTILS
	normalizeLanguagesForServer,
};
