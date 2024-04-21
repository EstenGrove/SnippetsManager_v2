export type TTableAlias = "lists" | "user_lists" | "tags" | "user_tags";

export type IColumnAlias = {
	[key: string]: string;
	id: string;
	createdDate: string;
	updatedDate: string;
	createdBy: string;
	updatedBy: string;
	isActive: string;
};

export type IColumnAliases = {
	[key in TTableAlias]: IColumnAlias;
};

const COLUMN_ALIASES: IColumnAliases = {
	lists: {
		id: "list_id",
		name: "list_name",
		desc: "list_desc",
		isPinned: "is_pinned",
		createdDate: "created_date",
		updatedDate: "updated_date",
		createdBy: "created_by",
		updatedBy: "updated_by",
		isActive: "is_active",
	},
	user_lists: {
		id: "user_list_id",
		userID: "user_id",
		listID: "list_id",
		name: "list_name",
		desc: "list_desc",
		createdDate: "created_date",
		updatedDate: "updated_date",
		createdBy: "created_by",
		updatedBy: "updated_by",
		isActive: "is_active",
	},
	tags: {
		id: "tag_id",
		name: "tag_name",
		color: "tag_color",
		isPinned: "is_pinned",
		createdDate: "created_date",
		updatedDate: "updated_date",
		createdBy: "created_by",
		updatedBy: "updated_by",
		isActive: "is_active",
	},
	user_tags: {
		id: "user_tag_id",
		userID: "user_id",
		tagID: "tag_id",
		createdDate: "created_date",
		updatedDate: "updated_date",
		createdBy: "created_by",
		updatedBy: "updated_by",
		isActive: "is_active",
	},
};

export { COLUMN_ALIASES };
