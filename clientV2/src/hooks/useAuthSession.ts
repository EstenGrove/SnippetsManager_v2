import { useState, useMemo, useCallback, useEffect } from "react";
import { getAuthFromCache, refreshAuthSession } from "../utils/utils_auth";
import { diffInMins } from "../utils/utils_dates";
import {
	IAuthResponse,
	IAuthSession,
	ISessionStatus,
	TCacheItem,
} from "../shared/AuthTypes";
import { SESSION_THRESHOLD, getSessionStatus } from "../utils/utils_session";
import { defaultAuth } from "../utils/utils_cache";
import { TResponse } from "../shared/ResponseTypes";
import { useAppDispatch } from "../store/store";
import { refreshUser } from "../features/currentUser/currentUserSlice";

// REQUIREMENTS:
// - Check currentUser.auth slice for active session & token
// - Check local storage cache for active session & token
// - Order of Truth:
//    1. currentUser.auth
//    2. LocalStorage cache

// HARD-CODED SETTING PER ENVIRONMENT
const THRESHOLD = SESSION_THRESHOLD;

export type AuthHookProps = {
	onSuccess?: (sessionData?: unknown) => void;
	onReject?: () => void;
	onExpiring?: () => void; // ##TODO
};

const shouldRefresh = (authSession: IAuthSession): boolean => {
	// IF 'isValid' (if it's not valid, we can't refresh it!)
	// IF last refresh is greater than THRESHOLD (30 mins maybe?)
	// IF start time is greater than THRESHOLD (30 mins maybe?)
	// IF 'isExpiring'
	// IF 60 mins from expiry
	const now = new Date();
	const { lastRefreshedAt, sessionExpiry, sessionStart } = authSession;
	// from start/refresh
	const timeSinceStart = diffInMins(now, sessionStart);
	const timeSinceRefresh = diffInMins(now, lastRefreshedAt);
	const timeToExpiry = diffInMins(now, sessionExpiry);
	const needsRefresh =
		timeSinceStart >= THRESHOLD ||
		timeSinceRefresh >= THRESHOLD ||
		timeToExpiry <= THRESHOLD;

	return needsRefresh;
};

const useAuthSession = ({ onSuccess, onReject }: AuthHookProps) => {
	const dispatch = useAppDispatch();
	const cachedAuth: TCacheItem<IAuthSession> = getAuthFromCache();
	const [authSession, setAuthSession] = useState<IAuthSession>(
		cachedAuth as IAuthSession
	);
	const sessionStatus = useMemo<ISessionStatus>(() => {
		return getSessionStatus(authSession);
	}, [authSession]);

	const checkAndRefreshSession = useCallback(async () => {
		const needsRefresh = shouldRefresh(authSession);

		if (!needsRefresh) return;
		// if needs refresh:
		// IF refresh was successful, set to state & cache
		// IF refresh failed, clear out state & cache
		const { userID, sessionToken } = authSession;
		const freshSession = (await refreshAuthSession(
			userID,
			sessionToken
		)) as TResponse<IAuthResponse>;

		console.log("freshSession", freshSession);
		// Refresh was successful
		if (freshSession.Status === "SUCCESS") {
			const data = freshSession?.Data;
			const { Session, User } = data;
			setAuthSession({
				userID: User.UserID,
				sessionID: Session.SessionID,
				sessionToken: Session.Token,
				sessionStart: Session.SessionStart,
				sessionExpiry: Session.SessionExpiry,
				sessionLength: 0,
				lastRefreshedAt: new Date().toString(),
			});
			// REFRESH USER HERE!!!!
			dispatch(
				refreshUser({
					userID: User.UserID,
					username: User.Username,
					email: User.Email,
					password: null,
					token: Session.Token,
					sessionID: Session.SessionID,
					sessionStart: Session.SessionStart,
					expiry: Session.SessionExpiry,
					isAuthenticated: true,
					lastRefreshedAt: new Date().toString(),
				})
			);
			return onSuccess && onSuccess();
		} else {
			// Refresh failed/rejected
			setAuthSession(defaultAuth);
			return onReject && onReject();
		}
	}, [authSession, onSuccess, onReject, dispatch]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		// if (sessionStatus?.isExpiring) {
		checkAndRefreshSession();
		// }

		return () => {
			isMounted = false;
		};
	}, [sessionStatus, checkAndRefreshSession]);

	return {
		authSession,
		sessionStatus,
		checkAndRefreshSession,
	};
};

export { useAuthSession };
