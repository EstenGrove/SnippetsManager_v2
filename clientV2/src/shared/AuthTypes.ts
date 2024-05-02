export type TAuthSessionCacheKey = "iasc";
export type TCacheItem<T> = T;

export interface IAuthResponse {
	User: {
		UserID: string;
		Username: string;
		Email: string;
		Token: string;
	};
	Session: {
		UserID: string;
		SessionID: string;
		Token: string;
		SessionStart: string;
		SessionExpiry: string;
		IsActive: boolean;
	};
}

export interface IAuthSession {
	userID: string;
	sessionID: string;
	sessionToken: string;
	sessionStart: string;
	sessionExpiry: string;
	sessionLength: number;
	lastRefreshedAt: string;
}

export interface ISessionStatus {
	isValid: boolean;
	isExpiring: boolean;
}
