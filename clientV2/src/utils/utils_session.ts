import { IAuthSession, ISessionStatus } from "../shared/AuthTypes";
import { diffInMins, isDateWithinRange } from "./utils_dates";

const SESSION_THRESHOLD = 2; // 30

// checks if we're within an active session's window
const isWithinSession = (authSession: IAuthSession): boolean => {
	const now = new Date();
	const inSession = isDateWithinRange(now, {
		start: authSession?.sessionStart,
		end: authSession?.sessionExpiry,
	});
	return inSession;
};

// checks if the current session is expiring soon, based off a threshold
const isExpiring = (authSession: IAuthSession) => {
	const { sessionExpiry } = authSession;
	const now = new Date();
	const inSession = isWithinSession(authSession);
	// const timeToExpiry = diffInMins(now, sessionExpiry);
	const timeToExpiry = 1;
	const isAboutToExpire = timeToExpiry >= SESSION_THRESHOLD;
	return inSession && isAboutToExpire;
};

// calculates the session status from 'authSession'
const getSessionStatus = (authSession: IAuthSession): ISessionStatus => {
	const hasToken = !!authSession?.sessionToken;
	const inSession = isWithinSession(authSession);
	const isAboutToExpire = isExpiring(authSession);
	const isValid = hasToken && inSession;

	return {
		isValid: isValid,
		isExpiring: isAboutToExpire,
	};
};

export { SESSION_THRESHOLD, getSessionStatus, isWithinSession, isExpiring };
