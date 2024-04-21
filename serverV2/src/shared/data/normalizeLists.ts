import { IDBListRecord, IDBUserListRecord } from "../../models/Lists/Lists";

// 'LISTS' FROM THE 'lists' TABLE
const normalizeListForServer = (dbList: IDBListRecord) => {
	const serverList = {
		ListID: dbList.list_id,
		Name: dbList.list_name,
		Desc: dbList.list_desc,
		IsPinned: dbList.is_pinned,
		CreatedDate: dbList.created_date,
		UpdatedDate: dbList.updated_date,
		CreatedBy: dbList.created_by,
		UpdatedBy: dbList.updated_by,
		IsActive: dbList.is_active,
	};

	return serverList;
};

const normalizeListsForServer = (dbLists: IDBListRecord[]) => {
	if (!dbLists) return [];
	const serverLists = dbLists.map((tagRecord) =>
		normalizeListForServer(tagRecord)
	);

	return serverLists;
};

// 'USERLISTS' FROM THE 'user_lists' TABLE
const normalizeUserListForServer = (dbUserList: IDBUserListRecord) => {
	const serverList = {
		UserListID: dbUserList.user_list_id,
		UserID: dbUserList.user_id,
		ListID: dbUserList.list_id,
		Name: dbUserList.list_name,
		IsPinned: dbUserList.is_pinned,
		CreatedDate: dbUserList.created_date,
		UpdatedDate: dbUserList.updated_date,
		CreatedBy: dbUserList.created_by,
		UpdatedBy: dbUserList.updated_by,
		IsActive: dbUserList.is_active,
	};

	return serverList;
};

const normalizeUserListsForServer = (dbUserLists: IDBUserListRecord[]) => {
	if (!dbUserLists || dbUserLists?.length <= 0) return [];
	const serverLists = dbUserLists.map((userListRecord) =>
		normalizeUserListForServer(userListRecord)
	);

	return serverLists;
};

export {
	// 'USER-LIST' UTILS //
	normalizeUserListForServer,
	normalizeUserListsForServer,
	// 'LIST' UTILS //
	normalizeListForServer,
	normalizeListsForServer,
};
