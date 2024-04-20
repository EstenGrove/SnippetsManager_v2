import { NextFunction, Request, Response, response } from "express";
import { validateAuthHeaders } from "../../shared/utils/authUtils";

/**
 * TAuthHeaders:
 * - The auth headers are a base64 encoded string for Basic Authorization
 * - Ex. 'Basic XXXXXXXXXXXX'
 */
export type TAuthHeaders = string | undefined;

/**
 * 'apiLogin': Parses the request's authorization headers to validate whether the request should be permitted access to proceed
 * - This checks for the API's username & password in the request headers
 * - NOTE: THIS IS NOT USER AUTHENTICATION, THIS IS API-LEVEL AUTHORIZATION. A USER STILL NEEDS TO BE AUTHENTICATED/LOGGED-IN
 * @param req {Request} - Express Request object
 * @param res {Response} - Express Response object
 * @param next {NextFunction} - Express NextFunction (eg. next())
 * @returns {Response|NextFunction} - Returns a failure response or calls next() to proceed in chain
 */
const apiLogin = (req: Request, res: Response, next: NextFunction) => {
	const authHeaders: TAuthHeaders = req.headers.authorization;
	const isValidAuth: boolean = validateAuthHeaders(
		authHeaders as TAuthHeaders as string
	);
	console.log("isValidAuth(apiLogin)", isValidAuth);

	if (!isValidAuth) {
		return res.status(401).json({ Status: "FAILED", Message: "Un-authorized" });
	} else {
		return next();
	}
};

export { apiLogin };
