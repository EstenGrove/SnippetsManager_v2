/**
 * SHARED TYPES:
 * - This file contains various types that are shared across many/multiple state slices
 */
// Request status's
export type TStatus = "IDLE" | "PENDING" | "FULFILLED" | "REJECTED";

export type TUserThunkArgs = {
	token: string;
	userID: string;
};
