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
		id: "",
		createdDate: "",
		updatedDate: "",
		createdBy: "",
		updatedBy: "",
		isActive: "",
	},
	tags: {
		id: "",
		createdDate: "",
		updatedDate: "",
		createdBy: "",
		updatedBy: "",
		isActive: "",
	},
	user_tags: {
		id: "",
		createdDate: "",
		updatedDate: "",
		createdBy: "",
		updatedBy: "",
		isActive: "",
	},
};

export { COLUMN_ALIASES };
