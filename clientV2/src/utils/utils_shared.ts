import { ICurrentUser, IUserServerRecord } from "../features/currentUser/types";
import { IServerLanguage } from "../features/languages/types";
import { IServerUserList, IUserList } from "../features/lists/types";
import { IServerSnippet } from "../features/snippets/types";
import { IServerTag, ITag } from "../features/tags/types";

export type TResponseStatus = "SUCCESS" | "FAILED";

export type TResponseUnknown = {
	[key: string]: unknown;
};

export type TResponseData<T> = T | TResponseUnknown;

export interface IResponse {
	Status: TResponseStatus;
	Data: TResponseUnknown;
	Message: string;
	Results: string;
	ErrorMessage: string;
	ErrorStack: string;
}

///////////////////////////////////////////////////
///////////// LANGUAGE NORMALIZATION //////////////
///////////////////////////////////////////////////

const normalizeLangForClient = (serverLang: IServerLanguage) => {
	const clientLang = {
		languageID: serverLang.LanguageID,
		name: serverLang.Name,
		alias: serverLang.Alias,
		desc: serverLang?.Desc,
		extension: serverLang?.Extension,
		isActive: serverLang.IsActive,
		createdDate: serverLang.CreatedDate,
		updatedDate: serverLang.UpdatedDate,
		createdBy: serverLang.CreatedBy,
		updatedBy: serverLang.UpdatedBy,
	};

	return clientLang;
};

const normalizeLangsForClient = (serverLangs: IServerLanguage[]) => {
	if (!serverLangs || serverLangs?.length <= 0 || !Array.isArray(serverLangs))
		return [];
	const clientLangs = serverLangs.map((langRecord) =>
		normalizeLangForClient(langRecord)
	);

	return clientLangs;
};

///////////////////////////////////////////////////
//////////// CURRENT-USER NORMALIZATION ///////////
///////////////////////////////////////////////////

const normalizeUserForClient = (user: IUserServerRecord): ICurrentUser => {
	const clientUser = {
		userID: user?.UserID,
		username: user?.Username,
		email: user?.Email,
		password: user?.Password,
		isAdmin: false,
		isTeamLead: false,
		createdDate: user?.CreatedDate,
		updatedDate: user?.UpdatedDate,
		createdBy: user?.CreatedBy,
		updatedBy: user?.UpdatedBy,
	};

	return clientUser;
};
const normalizeUsersForClient = (
	users: IUserServerRecord[]
): ICurrentUser[] => {
	if (!users || users.length <= 0) return [];
	const clientUsers = users.map((user) => normalizeUserForClient(user));

	return clientUsers;
};

///////////////////////////////////////////////////
/////////////// LISTS NORMALIZATION ///////////////
///////////////////////////////////////////////////

const normalizeUserListForClient = (serverList: IServerUserList): IUserList => {
	const clientUserList = {
		userListID: serverList.UserListID,
		userID: serverList.UserID,
		listID: serverList.ListID,
		listName: serverList.Name,
		isPinned: serverList.IsPinned,
		createdDate: serverList.CreatedDate,
		updatedDate: serverList.UpdatedDate,
		createdBy: serverList.CreatedBy,
		updatedBy: serverList.UpdatedBy,
		isActive: serverList.IsActive,
	};

	return clientUserList;
};
const normalizeUserListsForClient = (
	serverLists: IServerUserList[] | []
): IUserList[] => {
	const clientUserLists = serverLists.map((list) =>
		normalizeUserListForClient(list)
	);

	return clientUserLists;
};

///////////////////////////////////////////////////
/////////////// TAGS NORMALIZATION ////////////////
///////////////////////////////////////////////////

const normalizeTagForClient = (serverTag: IServerTag): ITag => {
	const clientTag = {
		tagID: serverTag.TagID,
		tagName: serverTag.TagName,
		tagColor: serverTag.TagColor,
		isPinned: serverTag.IsPinned,
		createdDate: serverTag.CreatedDate,
		updatedDate: serverTag.UpdatedDate,
		createdBy: serverTag.CreatedBy,
		updatedBy: serverTag.UpdatedBy,
		isActive: serverTag.IsActive,
	};
	return clientTag;
};
const normalizeTagsForClient = (serverTags: IServerTag[]): ITag[] => {
	const clientTags = serverTags.map((serverTag) =>
		normalizeTagForClient(serverTag)
	);

	return clientTags;
};

///////////////////////////////////////////////////
///////////// SNIPPETS NORMALIZATION //////////////
///////////////////////////////////////////////////

const normalizeSnippetForClient = (serverSnippet: IServerSnippet) => {
	const clientSnippet = {
		snippetID: serverSnippet.SnippetID,
		languageID: serverSnippet.LanguageID,
		snippetName: serverSnippet.Name,
		snippetDesc: serverSnippet.Desc,
		snippetCode: serverSnippet.CodeSnippet,
		snippetOrigin: serverSnippet.OriginInfo,
		createdDate: serverSnippet.CreatedDate,
		updatedDate: serverSnippet.UpdatedDate,
		createdBy: serverSnippet.CreatedBy,
		updatedBy: serverSnippet.UpdatedBy,
		isActive: serverSnippet.IsActive,
	};

	return clientSnippet;
};

const normalizeSnippetsForClient = (serverSnippets: IServerSnippet[]) => {
	if (!serverSnippets || serverSnippets.length <= 0) return [];
	const clientSnippets = serverSnippets.map((serverSnippet) =>
		normalizeSnippetForClient(serverSnippet)
	);

	return clientSnippets;
};

export {
	// Language Utils
	normalizeLangForClient,
	normalizeLangsForClient,
	// User Utils
	normalizeUserForClient,
	normalizeUsersForClient,
	// Team Utils
	// List Utils
	normalizeUserListForClient,
	normalizeUserListsForClient,
	// Tag Utils
	normalizeTagForClient,
	normalizeTagsForClient,
	// Fave Utils
	// Snippet Utils
	normalizeSnippetForClient,
	normalizeSnippetsForClient,
};
