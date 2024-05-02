import express, { response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import {
	IRequestResponse,
	IResponseModel,
	ResponseModel,
} from "../../models/shared/ResponseModel";
import {
	IDBUserSession,
	getUserByEmail,
	getUserByUserID,
	getUserByUsernameOrEmail,
	recordUserSession,
	registerNewUser,
	updateUserSession,
} from "../../db/user/userQueries";
import {
	generateSecurityToken,
	validatePassword,
} from "../../shared/utils/authUtils";
import { doesEmailAlreadyExist } from "../../shared/utils/authUtils";
import { IUserDBRecord } from "../../models/user/types";
import { addHoursToDate } from "../../shared/third-party/date-fns";

const app = express();

const SALT_ROUNDS = 10;

/**
 * Login a user account (create session)
 * @param req {Request} - Request object
 * @param res {Response} - Response object
 * @param next {NextFunction} - Express 'next()' function
 * @returns {IResponseModel} - Returns custom response object w/ registered user's details
 */
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	const { username, password } = req.query || req.body;
	if (!username || !password) {
		// send message about required fields here...
		const failed = new ResponseModel({
			status: "FAILED",
			data: {},
			msg: "Failed: Username(email) & Password are required!",
			results: 0,
			errorMsg: "Username(email) & Password are required!",
		});
		return res.status(400).json(failed);
	}

	try {
		const existingUser = await getUserByUsernameOrEmail(username as string);
		console.log("EXISTING USER:", existingUser);

		if (!existingUser) {
			const failed = new ResponseModel({
				status: "FAILED",
				data: {
					Title: "User Not Found!",
					Msg: "No account matching those credentials was found!",
				},
				msg: "Failed: Invalid credentials or user does not exist!",
				results: 0,
				errorMsg: "Invalid credentials or user does not exist!",
			});
			return res.status(400).json(failed);
		}
		const passwordsMatch = await validatePassword(
			password as string,
			existingUser.password as string
		);
		if (!passwordsMatch) {
			// INVALID PASSWORD (OR PASSWORDS JUST DON'T MATCH)
			const failure = new ResponseModel({
				status: "FAILED",
				msg: "Invalid password. Please try again!",
				data: {
					Title: "Invalid Credentials",
					Msg: "Invalid password. Please try again!",
				},
				results: 0,
				errorMsg: null,
				errorStack: null,
			});
			return res.status(400).json(failure);
		} else {
			// LOGIN USER SUCCESSFULLY
			const userAgent = req.get("User-Agent") as string;
			const token = generateSecurityToken(existingUser.user_id);
			const sessionInfo = (await recordUserSession(
				existingUser.user_id,
				token,
				userAgent
			)) as IDBUserSession;
			const sessionExpiry = addHoursToDate(sessionInfo.login_date as string, 5);
			const success = new ResponseModel({
				status: "SUCCESS",
				msg: "You're logged in!",
				data: {
					User: {
						UserID: existingUser.user_id,
						Username: existingUser.username,
						Email: existingUser.email,
						Token: token,
					},
					Session: {
						UserID: sessionInfo.user_id,
						SessionID: sessionInfo.session_id,
						Token: sessionInfo.user_token,
						SessionStart: sessionInfo.login_date,
						SessionExpiry: sessionExpiry,
						IsActive: sessionInfo.is_active,
					},
				},
				results: 1,
				errorMsg: null,
				errorStack: null,
			});
			return res.status(200).json(success);
		}
	} catch (error) {
		console.log("error", error);
		const errorResp = new ResponseModel({
			status: "FAILED",
			msg: "An error occurred",
			errorMsg: new Error(error as string).message as string,
			errorStack: new Error(error as string).stack?.toString() as string,
		});
		return res.status(400).json(errorResp);
	}
};

/**
 * Register/signup a new user account
 * @param req {Request} - Request object
 * @param res {Response} - Response object
 * @param next {NextFunction} - Express 'next()' function
 * @returns {IResponseModel} - Returns custom response object w/ registered user's details
 */
const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, email, password } = req.query;

	console.group("REGISTER");
	console.log("username", username);
	console.log("email", email);
	console.log("password", password);
	console.groupEnd();

	if (!username || !email || !password) {
		// send message about required fields here...
		const failed: IResponseModel = new ResponseModel({
			status: "FAILED",
			data: {
				Title: `All Fields Are Required!`,
				Msg: `Failed: Username(email) & Password are required!`,
			},
			msg: "Failed: Username(email) & Password are required!",
			results: 0,
			errorMsg: "Username(email) & Password are required!",
		});
		return res.status(400).json(failed);
	}
	const alreadyExists = await doesEmailAlreadyExist(email as string);
	console.log("alreadyExists", alreadyExists);

	// if already exists, return failed response
	if (alreadyExists) {
		const response: IResponseModel = new ResponseModel({
			status: "FAILED",
			msg: `This email already exists: ${email}`,
			data: {
				Title: `Account Already Exists!`,
				Msg: `This email already exists: ${email}`,
			},
			results: 1,
			errorMsg: null,
			errorStack: null,
		});
		return res.status(200).json(response);
	}

	try {
		const hashedPassword = bcrypt.hash(password as string, SALT_ROUNDS);
		const hashedStr = (await hashedPassword).toString();

		const results: IUserDBRecord[] | unknown = await registerNewUser(
			username as string,
			email as string,
			hashedStr as string
		);
		// check if we have records returned & pick the 1st (only object in array)
		const user = Array.isArray(results) ? (results[0] as IUserDBRecord) : {};

		const response: IResponseModel = new ResponseModel({
			status: "SUCCESS",
			msg: "User account was created successfully!",
			data: {
				User: {
					...user,
					password: hashedStr,
				},
			},
			results: 1,
			errorMsg: null,
			errorStack: null,
		});
		return res.status(200).json(response);
	} catch (error) {
		console.log("Register User (error):", error);
		return error;
	}
};

const logoutUser = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<IResponseModel | unknown> => {
	const sessionID = req.query.sessionID;
	// update user session & invalidate token
	try {
		const updatedSession = (await updateUserSession(
			sessionID as string
		)) as IDBUserSession;
		const response = new ResponseModel({
			status: "SUCCESS",
			data: {
				SessionID: updatedSession?.session_id,
				LogoutDate: updatedSession?.logout_date,
				IsLoggedOut: !updatedSession?.is_active,
			},
		});
		return res.status(200).json(response);
	} catch (error: unknown) {
		console.log("error", error);
		return error;
	}
};

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
	// extract userID and token from query params & headers, respectively
	const userID = req.query?.userID;
	const apiAuth = req.headers.authorization;
	const token = req.headers.securitytoken;
	console.log("userID", userID);
	console.log("apiAuth", apiAuth);
	console.log("token", token);

	try {
		// verify/compare tokens
		const tokenResults = jwt.verify(
			token as string,
			process.env.JWT_SECRET as Secret
		) as JwtPayload;
		console.log("token", token);

		if (tokenResults && !!tokenResults?.userID) {
			return res.status(200).json({
				Status: "SUCCESS",
				IsValid: !!tokenResults,
				Token: token,
				UserID: tokenResults?.userID,
			});
		} else {
			return res.status(403).json({
				Status: "FAILED",
				IsValid: false,
				Token: null,
			});
		}
	} catch (error) {
		console.log("err", error);
		return res.status(400).json({
			Message: "Issue Found",
		});
	}
};

const refreshAuthSession = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userID = req.query?.userID as string;
	const apiAuth = req.headers.authorization as string;
	const token = req.headers.securitytoken as string;
	const userAgent = req.headers["user-agent"] as string;

	try {
		const tokenResults = jwt.verify(
			token as string,
			process.env.JWT_SECRET as Secret
		) as JwtPayload;

		if (tokenResults && !!tokenResults?.userID) {
			const user = await getUserByUserID(userID);
			const sessionInfo = (await recordUserSession(
				user.user_id,
				token,
				userAgent
			)) as IDBUserSession;
			const sessionExpiry = addHoursToDate(sessionInfo.login_date as string, 5);
			const newToken = generateSecurityToken(userID);
			const responseObj = new ResponseModel({
				status: "SUCCESS",
				msg: "Session was refreshed!",
				data: {
					User: {
						UserID: user.user_id,
						Username: user.username,
						Email: user.email,
						Token: newToken,
					},
					Session: {
						UserID: user.user_id,
						SessionID: sessionInfo.session_id,
						Token: newToken,
						SessionStart: sessionInfo.login_date,
						SessionExpiry: sessionExpiry,
						IsActive: sessionInfo.is_active,
					},
				},
			});
			return res.status(200).json(responseObj);
		}
		return res.status(400).json({ Status: "FAILED", Message: "Un-authorized" });
	} catch (error) {
		console.log("error", error);
		return res.status(400).json({ Status: "FAILED", Message: "Un-authorized" });
	}
	// check if user is valid/exists by userID
	// check if token is valid
	// generate a fresh token
	// generate a fresh session
};

app.use("/", loginUser);
app.use("/", logoutUser);
app.use("/", registerUser);
app.use("/", checkAuth);
app.use("/", refreshAuthSession);

export { loginUser, logoutUser, registerUser, checkAuth, refreshAuthSession };
