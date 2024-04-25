/**
 * SHARED TYPES:
 * - This file contains various types that are shared across many/multiple state slices
 * - 'TStatus': async action states: 'IDLE', 'PENDING', 'FULFILLED', 'REJECTED'
 * - 'TUserThunkArgs': arguments object passed to various async action reducers
 */
// Request status's
export type TStatus = "IDLE" | "PENDING" | "FULFILLED" | "REJECTED";

export type TUserThunkArgs = {
	token: string;
	userID: string;
};
export interface IUserThunkArgs {
	token: string;
	userID: string;
}
