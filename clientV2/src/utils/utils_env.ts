export type TApiAuthEnv = "production" | "development" | "testing" | "local";

// development, production, testing, local
export interface IApiAuthMap {
	[TApiAuthEnv: string]: {
		base: string;
		user: string;
		password: string;
		sessionLength: number;
	};
}

const API_AUTH: IApiAuthMap = {
	development: {
		base: "FROM ENV FILE (.env.dev)",
		user: "FROM ENV FILE (.env.dev)",
		password: "FROM ENV FILE (.env.dev)",
		sessionLength: 5, // in hours
	},
	production: {
		base: "FROM ENV FILE (.env.prod)",
		user: "FROM ENV FILE (.env.prod)",
		password: "FROM ENV FILE (.env.prod)",
		sessionLength: 5, // in hours
	},
	testing: {
		base: "FROM ENV FILE (.env.test)",
		user: "FROM ENV FILE (.env.test)",
		password: "FROM ENV FILE (.env.test)",
		sessionLength: 5, // in hours
	},
	local: {
		base: import.meta.env.VITE_API_BASE,
		user: import.meta.env.VITE_API_USER,
		password: import.meta.env.VITE_API_PWD,
		sessionLength: 5, // in hours
	},
};

const CURRENT_ENV_NAME = "local";
const CURRENT_ENV_AUTH = API_AUTH[CURRENT_ENV_NAME];

const API_ENDPOINTS = {
	auth: {
		login: "/Login",
		logout: "/Logout",
		register: "/Register",
		checkAuth: "/CheckAuth",
		refreshAuth: "/RefreshAuth",
	},
	user: {
		userDetails: "/GetUserDetails",
	},
	lists: {
		getAll: "/GetLists", // all lists
		getByID: "/GetListByID", // single list by id
		getAllUserLists: "/GetUserLists", // all user lists
		getAllTeamLists: "/GetTeamLists", // all user lists
		saveNewUserList: "/SaveNewUserList", // new user list
		saveNewTeamList: "/SaveNewTeamList", // new team list
		saveNew: "/SaveNewList", // saves new generic list, not associated with anyone
	},
	tags: {
		getAll: "/GetTags",
		getByID: "/GetTagByID",
		getAllUserTags: "/GetUserTags", // all user Tags
		getAllTeamTags: "/GetTeamTags", // all user lists
		saveNewUserTag: "/SaveNewUserTag", // new user Tag
		saveNewTeamTag: "/SaveNewTeamTag", // new team Tag
		saveNew: "/SaveNewTag", // saves new generic Tag, not associated with anyone
	},
	langs: {
		getAll: "/GetLangs",
		getByID: "/GetLangByID",
	},
	snippets: {
		getAll: "/GetSnippets",
		getByID: "/GetSnippetByID",
		getUserSnippets: "/GetUserSnippets", // all user snippets
		getListSnippets: "/GetListSnippets", // all snippets for a list ID
		saveNew: "/SaveNewSnippet",
	},
};
const { auth, user, lists, tags, langs, snippets } = API_ENDPOINTS;

export {
	API_AUTH,
	CURRENT_ENV_AUTH as currentEnv,
	CURRENT_ENV_NAME as currentEnvName,
};

export { API_ENDPOINTS, auth, user, lists, tags, langs, snippets };
