export type TApiEnv = "production" | "development" | "testing" | "local";

export interface IApiAuthMap {
	[TApiEnv: string]: {
		base: string | undefined;
		user: string | undefined;
		password: string | undefined;
		sessionLength: number | undefined;
	};
}

const API_AUTH: IApiAuthMap = {
	development: {
		base: process.env.API_BASE,
		user: process.env.API_USER,
		password: process.env.API_USER_PWD,
		sessionLength: Number(process.env.JWT_SESSION_LENGTH),
	},
	production: {
		base: process.env.API_BASE,
		user: process.env.API_USER,
		password: process.env.API_USER_PWD,
		sessionLength: Number(process.env.JWT_SESSION_LENGTH),
	},
	testing: {
		base: process.env.API_BASE,
		user: process.env.API_USER,
		password: process.env.API_USER_PWD,
		sessionLength: Number(process.env.JWT_SESSION_LENGTH),
	},
	local: {
		base: process.env.API_BASE,
		user: process.env.API_USER,
		password: process.env.API_USER_PWD,
		sessionLength: Number(process.env.JWT_SESSION_LENGTH),
	},
};

const CURRENT_ENV_NAME: TApiEnv = "local";
const CURRENT_ENV_AUTH = API_AUTH[CURRENT_ENV_NAME];

// Current Env's Api Details (SHOULD BE DEPRECATED IN LIEU OF 'API_AUTH' MAP LATER ON)
const API_DETAILS = {
	user: process.env.API_USER,
	password: process.env.API_USER_PWD,
	token: process.env.API_USER_TOKEN,
	sessionLength: process.env.JWT_SESSION_LENGTH,
};

export {
	// CURRENT API'S ENV DETAILS (DEPRECATE THIS LATER!!!)
	API_DETAILS,
	// UPDATED API ENV DETAILS MAP
	API_AUTH as apiEnvAuth,
	CURRENT_ENV_NAME as currentEnvName,
	CURRENT_ENV_AUTH as currentEnv,
};
