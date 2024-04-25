import { useState, useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
	IUserAuth,
	selectCurrentUserAuth,
} from "../features/currentUser/currentUserSlice";
import {
	IAuthResponse,
	IAuthSession,
	checkAuthSession,
	clearRememberMe,
	getRememberMe,
	refreshAuthSession,
	setRememberMe,
} from "../utils/utils_auth";
import { currentEnv } from "../utils/utils_env";
import { diffInMins, isDateWithinRange } from "../utils/utils_dates";

// REQUIREMENTS:
// - Check currentUser.auth slice for active session & token
// - Check local storage cache for active session & token
// - Order of Truth:
//    1. currentUser.auth
//    2. LocalStorage cache

// HARD-CODED SETTING PER ENVIRONMENT
const SESSION_LENGTH = currentEnv?.sessionLength ?? 5;

export interface IAuthSessionStatus {
	isValid: boolean;
	isExpiring: boolean; // is within threshold like 30 mins or something
	timeToExpiry: number; // time to expire in mins
	sessionID: string | null;
	token: string | null; // security token (user-specific/session-specific)
	lastRefreshed: Date | string | null;
}

export type TAuthHookProps = {
	onSuccess?: () => void;
	onReject?: () => void;
	onExpiring?: () => void; // ##TODO
};

const THRESHOLD = 2;

const shouldRefresh = (authSession: IAuthSession): boolean => {
	// IF 'isValid' (if it's not valid, we can't refresh it!)
	// IF last refresh is greater than X (30 mins maybe?)
	// IF start time is greater than X (30 mins maybe?)
	// IF 'isExpiring'
	// IF 60 mins from expiry
	const now = new Date();
	const { lastRefreshedAt, sessionExpiry, sessionStart } = authSession;
	// from start/refresh
	const timeSinceStart = diffInMins(now, sessionStart as string);
	const timeSinceRefresh = diffInMins(now, lastRefreshedAt as string);
	const timeToExpiry = diffInMins(now, sessionExpiry as string);
	const needsRefresh =
		timeSinceStart >= THRESHOLD ||
		timeSinceRefresh >= THRESHOLD ||
		timeToExpiry <= THRESHOLD;

	return needsRefresh;
};

const useAuthSession = ({ onSuccess, onReject }: TAuthHookProps) => {
	const userAuthCache: IAuthSession = getRememberMe();
	const userAuth: IUserAuth = useSelector(selectCurrentUserAuth);
	const [authSession, setAuthSession] = useState<IAuthSession>(() => {
		// We check if state already has a session & use that first
		// ...otherwise we fallback to the cache, which may be stale
		if (userAuth?.sessionID && userAuth.sessionID !== null) {
			return {
				userID: userAuth.userID,
				sessionID: userAuth.sessionID,
				sessionStart: userAuth.sessionStart,
				sessionExpiry: userAuth.expiry,
				sessionLength: SESSION_LENGTH,
				sessionToken: userAuth.token,
				lastRefreshedAt: userAuth.lastRefreshedAt,
			};
		} else {
			return {
				userID: userAuthCache.userID,
				sessionID: userAuthCache.sessionID,
				sessionStart: userAuthCache.sessionStart,
				sessionExpiry: userAuthCache.sessionExpiry,
				sessionLength: SESSION_LENGTH,
				sessionToken: userAuthCache.sessionToken,
				lastRefreshedAt: userAuthCache.lastRefreshedAt,
			};
		}
	});
	const sessionStatus = useMemo(() => {
		const now = new Date();
		const timeToExpiry = diffInMins(now, authSession?.sessionExpiry as string);

		return {
			isValid: true,
			isExpiring: false,
			timeToExpiry: timeToExpiry,
			sessionID: authSession?.sessionID,
			token: authSession?.sessionToken as string,
			lastRefreshed: authSession?.lastRefreshedAt,
		};
	}, [authSession]);
	const checkAndRefreshSession = useCallback(async () => {
		const needsRefresh = shouldRefresh(authSession);
		if (!needsRefresh) return;
		const { sessionToken, userID } = authSession;
		// refresh the session
		const freshSession = (await refreshAuthSession(
			userID as string,
			sessionToken as string
		)) as IAuthResponse;

		console.log("freshSession(from API):", freshSession);
		// session was validated
		if (freshSession.Status === "SUCCESS" && freshSession.IsValid) {
			const updatedSession = {
				userID: freshSession?.UserID as string,
				sessionID: userAuthCache.sessionID,
				sessionStart: userAuthCache.sessionStart,
				sessionExpiry: userAuthCache.sessionExpiry,
				sessionLength: SESSION_LENGTH,
				sessionToken: freshSession.Token,
				lastRefreshedAt: userAuthCache.lastRefreshedAt,
			};
			// sync to local state & update the cache
			setAuthSession(updatedSession as IAuthSession);
			setRememberMe(updatedSession as IAuthSession);
			if (onSuccess) return onSuccess();
		} else {
			setAuthSession({
				userID: null,
				sessionID: null,
				sessionStart: null,
				sessionExpiry: null,
				sessionLength: null,
				sessionToken: null,
				lastRefreshedAt: null,
			});
			clearRememberMe();
			if (onReject) return onReject();
		}
	}, [
		authSession,
		onReject,
		onSuccess,
		userAuthCache.lastRefreshedAt,
		userAuthCache.sessionExpiry,
		userAuthCache.sessionID,
		userAuthCache.sessionStart,
	]);

	useEffect(() => {
		// checkAndRefreshSession();
	}, [checkAndRefreshSession]);

	return {
		authSession,
		sessionStatus,
		checkAndRefreshSession,
	};
};

export { useAuthSession };
