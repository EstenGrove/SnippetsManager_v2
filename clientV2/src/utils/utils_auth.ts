import { IAuthSession, TAuthSessionCacheKey } from "../shared/AuthTypes";
import { defaultAuth, getAuthFromCache } from "./utils_cache";
import { hoursToSecs } from "./utils_dates";
import { auth, currentEnv } from "./utils_env";
import { IResponse, TResponseData } from "./utils_shared";

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

const login = async (
	username: string,
	password: string
): Promise<IResponse | unknown> => {
	let url = currentEnv.base + auth.login;
	url += "?" + new URLSearchParams({ username });
	url += "&password=" + encodeURIComponent(password);

	try {
		const request = await fetchWithAuth(url, {
			method: "POST",
		});
		const response = await request.json();
		return response as Promise<IResponse>;
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

// checks is auth session is valid & returns a refreshed auth token & session details
const refreshAuthSession = async (
	userID: string,
	token: string
): Promise<IResponse | unknown> => {
	let url = currentEnv.base + auth.refreshAuth;
	url += "?" + new URLSearchParams({ userID });
	try {
		const request = await fetchWithAuth(url, {
			token: token,
		});
		const response = await request.json();
		console.log("RefreshAuth", response);
		return response;
	} catch (error: unknown) {
		return error;
	}
};

// AUTH UTILS

// unique key used as 'key' value for storing in localStorage/sessionStorage etc
export const AUTH_SESSION_CACHE_KEY: TAuthSessionCacheKey = "iasc";

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

	const authCache = {
		userID,
		sessionID,
		sessionStart,
		sessionExpiry,
		sessionLength,
		sessionToken,
		lastRefreshedAt,
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
	const authCache: IAuthSession = getAuthFromCache(AUTH_SESSION_CACHE_KEY);
	return authCache;
};
const clearRememberMe = (): void => {
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
	getAuthFromCache,
	setRememberMe,
	getRememberMe,
	clearRememberMe,
	// Session Cookie Utils
	createBaseCookie,
	createSessionCookie,
	createCookies,
};
