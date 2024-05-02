export type TResponseStatus = "SUCCESS" | "FAILED";

export type TResponseUnknown = {
	[key: string]: unknown;
};

export type TResponseData<T> = T;

/**
 * IResponse:
 * - Generic HTTP Response object
 * - Includes 'unknown' Response.Data type
 */
export interface IResponse {
	Status: TResponseStatus;
	Data: TResponseUnknown;
	Message: string;
	Results: string;
	ErrorMessage: string;
	ErrorStack: string;
}

/**
 * TResponse:
 * - Generic HTTP Response object w/ generic .Data type
 * - Includes passing a type as the .Data field
 */
export type TResponse<T> = {
	Status: TResponseStatus;
	Data: T;
	Message: string;
	Results: string;
	ErrorMessage: string;
	ErrorStack: string;
};

export type TResponseFailure = TResponse<TResponseError>;

export type TResponseError = {
	Title: string;
	Msg: string;
};
