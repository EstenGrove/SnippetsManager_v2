import { hoursToSecs } from "./utils_dates";
import { auth, currentEnv } from "./utils_env";
import { IResponse } from "./utils_shared";

export type TFetchOptions = {
	method?: "POST" | "GET" | "PUT" | "DELETE";
	body?: object | undefined;
	contentType?: string | undefined;
	token?: string | undefined;
};

/**
 * Light wrapper around fetch that includes Authorization
 * @param url {String|URL} - Url string for api target
 * @param options {Request Options} - Request options: 'method', & 'body'
 * @returns
 */
const fetchWithAuth = async (url: string, options?: TFetchOptions) => {
	const method = options?.method ?? ("GET" as TFetchOptions["method"]);
	const body = options?.body as TFetchOptions["body"];
	const token = options?.token as TFetchOptions["token"];

	return fetch(url, {
		method: method,
		headers: {
			Authorization:
				"Basic " + btoa(currentEnv.user + ":" + currentEnv.password),
			"Content-Type": "application/json",
			SecurityToken: token,
		} as HeadersInit | undefined,
		body: JSON.stringify(body),
	});
};

const login = async (username: string, password: string) => {
	let url = currentEnv.base + auth.login;
	url += "?" + new URLSearchParams({ username });
	url += "&password=" + encodeURIComponent(password);

	try {
		const request = await fetchWithAuth(url, {
			method: "POST",
		});
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

const logout = async (sessionID: string, token: string) => {
	let url = currentEnv.base + auth.logout;
	url += "?" + new URLSearchParams({ sessionID });

	try {
		const request = await fetchWithAuth(url, {
			method: "POST",
			token: token,
		});
		const response = await request.json();
		return response;
	} catch (error) {
		return error;
	}
};

// Just checks whether a session's token is still valid
const checkAuthSession = async (userID: string, token: string) => {
	let url = currentEnv.base + auth.checkAuth;
	url += "?" + new URLSearchParams({ userID });
	try {
		const request = await fetchWithAuth(url, {
			token: token,
		});
		const response = await request.json();

		return response;
	} catch (error) {
		return error;
	}
};
//
export type IAuthResponse = {
	UserID: string;
	Status: "SUCCESS" | "FAILED";
	IsValid: boolean;
	Token?: string;
};
// checks is auth session is valid & returns a refreshed auth token & session details
const refreshAuthSession = async (
	userID: string,
	token: string
): Promise<IAuthResponse | unknown> => {
	let url = currentEnv.base + auth.checkAuth;
	url += "?" + new URLSearchParams({ userID });
	try {
		const request = await fetchWithAuth(url, {
			token: token,
		});
		const response = await request.json();

		return response;
	} catch (error: unknown) {
		return error;
	}
};

// AUTH UTILS

export type TAuthSessionCacheKey = "iasc";

export interface IAuthSession {
	userID: string | null; // guid
	sessionID: string | null; // guid
	sessionStart: string | null; // start date
	sessionExpiry: string | null; // expiry/end date
	sessionLength: number | null; // session length in hours
	sessionToken: string | null; // security token
	lastRefreshedAt: string | null;
}

export interface IAuthSessionCache {
	uid: string; // User ID
	s_id: string; // Session ID
	s_start: string; // Session Start time
	s_expiry: string; // Session Expiry time (eg. end time)
	s_token: string; // Session Token
	s_length: string; // Session Length (in hours)
	s_lastRefresh: string; // Time cache was last refreshed
}

export interface IAuthSessionCacheMap {
	uid: "userID"; // User ID
	s_id: "sessionID"; // Session ID
	s_start: "sessionStart"; // Session Start time
	s_expiry: "sessionExpiry"; // Session Expiry time (eg. end time)
	s_token: "sessionToken"; // Session Token
	s_length: "sessionLength"; // Session Length (in hours)
}

// unique key used as 'key' value for storing in localStorage/sessionStorage etc
export const AUTH_SESSION_CACHE_KEY: TAuthSessionCacheKey = "iasc";

export const SESSION_CACHE_MAP: IAuthSessionCacheMap = {
	uid: "userID", // User ID
	s_id: "sessionID", // Session ID
	s_start: "sessionStart", // Session Start time
	s_expiry: "sessionExpiry", // Session Expiry time (eg. end time)
	s_token: "sessionToken", // Session Token
	s_length: "sessionLength", // Session Length (in hours)
};

/**
 * Accepts an IAuthSession object, serializes it & sets it to localStorage
 * @param authSession {IAuthSession} - Takes a specific IAuthSession object instance
 */
const setRememberMe = (authSession: IAuthSession): void => {
	const {
		userID,
		sessionID,
		sessionStart,
		sessionExpiry,
		sessionLength,
		sessionToken,
		lastRefreshedAt,
	} = authSession;

	const authCache: IAuthSessionCache = {
		uid: userID as string,
		s_id: sessionID as string,
		s_start: sessionStart as string,
		s_expiry: sessionExpiry as string,
		s_token: sessionToken as string,
		s_length: sessionLength?.toString() as string,
		s_lastRefresh: lastRefreshedAt as string,
	};
	const key = AUTH_SESSION_CACHE_KEY;
	const serial = JSON.stringify(authCache);

	localStorage.setItem(key, serial);
};
/**
 * Retrieves an IAuthSession object, de-serializes it from local storage, if it exists!
 * @param authSession {IAuthSession} - Takes a specific IAuthSession object instance
 * @returns {IAuthSession} - Returns the current 'IAuthSession' instance, if exists
 */
const getRememberMe = (): IAuthSession => {
	const item = localStorage.getItem("iasc");
	if (item) {
		const sessionCache = JSON.parse(item);
		const authSession = {
			userID: sessionCache["uid"],
			sessionID: sessionCache["s_id"],
			sessionStart: sessionCache["s_start"],
			sessionExpiry: sessionCache["s_expiry"],
			sessionToken: sessionCache["s_token"],
			sessionLength: sessionCache["s_length"],
			lastRefreshedAt: sessionCache["s_lastRefresh"],
		};
		return authSession;
	} else {
		return {
			userID: null,
			sessionID: null,
			sessionStart: null,
			sessionExpiry: null,
			sessionToken: null,
			sessionLength: null,
			lastRefreshedAt: null,
		};
	}
};
const clearRememberMe = () => {
	localStorage.removeItem(AUTH_SESSION_CACHE_KEY);
};

const createBaseCookie = (maxAgeInHours: number) => {
	let cookieStr = `SameSite=none;`;
	cookieStr += `Secure;`;
	cookieStr += `max-age=${hoursToSecs(maxAgeInHours)}`;

	return cookieStr;
};
const createSessionCookie = (authSession: IAuthSession) => {
	const { userID, sessionID, sessionExpiry, sessionToken } = authSession;
	let cookieStr = `userID=${userID};`;
	cookieStr += `sessionID=${sessionID}; `;
	cookieStr += `sessionExpiry=${new Date(
		sessionExpiry as string
	).toUTCString()}; `;
	cookieStr += `sessionToken=${sessionToken}; `;
	cookieStr += `path=/; `;
	cookieStr += `domain=${import.meta.env.VITE_HOST}`;

	return cookieStr;
};

const createCookies = (authSession: IAuthSession) => {
	const baseCookie = createBaseCookie(5);
	const sessionCookie = createSessionCookie(authSession);
	const cookies = `${baseCookie}${sessionCookie}`;

	return cookies as string;
};

export {
	// Auth Request Utils
	fetchWithAuth,
	login,
	logout,
	// Auth Session Requests
	checkAuthSession,
	refreshAuthSession,
	// 'Remember Me' Session Cache Utils
	setRememberMe,
	getRememberMe,
	clearRememberMe,
	// Session Cookie Utils
	createBaseCookie,
	createSessionCookie,
	createCookies,
};
