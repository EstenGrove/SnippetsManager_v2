import { IAuthSession } from "../shared/AuthTypes";

const getItemFromCache = <T>(key: string): T | undefined => {
	const cache = localStorage.getItem(key);

	if (cache) {
		const item = <T>JSON.parse(cache);
		return item;
	} else {
		return undefined;
	}
};

const setItemToCache = <T>(key: string, item: T): void => {
	const serial = JSON.stringify(item);
	if (serial) {
		localStorage.setItem(key, item as string);
	}
};

const clearItemFromCache = (key: string): void => {
	localStorage.removeItem(key);
};

const defaultAuth: IAuthSession = {
	userID: "",
	sessionID: "",
	sessionToken: "",
	sessionStart: "",
	sessionExpiry: "",
	sessionLength: 0,
	lastRefreshedAt: "",
};

const getAuthFromCache = (key: string = "iasc"): IAuthSession => {
	const cache = getItemFromCache<IAuthSession>(key);
	if (cache) {
		return cache;
	} else {
		return defaultAuth;
	}
};

export {
	defaultAuth,
	getItemFromCache,
	setItemToCache,
	clearItemFromCache,
	getAuthFromCache,
};
