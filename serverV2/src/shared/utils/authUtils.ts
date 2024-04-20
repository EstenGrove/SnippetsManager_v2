import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { API_DETAILS as apiAuth } from "./envUtils";
import { getUserByEmail } from "../../db/user/userQueries";

// 5h => 5 hours
const SESSION_LENGTH = process.env.JWT_SESSION_LENGTH;

// API-Auth Utils

export interface TAuthHeaders {
	buffer: string;
	username: string;
	password: string;
}

/**
 * Checks authorization headers & compares against the target API credentials.
 * @param authHeaders {String} - The 'Basic xxxxxxxxx:xxxxxxxx' authorization headers string
 * @returns {TAuthHeaders} - Returns TAuthHeaders object w/ the parsed values: buffer, username & password as strings
 */
const processAuthHeaders = (authHeaders: string): TAuthHeaders => {
	const headerStr = authHeaders.split(/\s+/).pop() as unknown as string;
	const buffer = Buffer.from(headerStr, "base64").toString();
	const username = buffer?.split(":")?.[0];
	const password = buffer?.split(":")?.[1];

	return {
		buffer,
		username,
		password,
	};
};

/**
 * Checks authorization headers & compares against the target API credentials.
 * @param authHeaders {String} - The 'Basic xxxxxxxxx:xxxxxxxx' authorization headers string
 * @returns {Boolean} - Returns boolean
 */
const validateAuthHeaders = (authHeaders: string): boolean => {
	// check username, password
	const { username, password } = processAuthHeaders(authHeaders);

	const isValid = username === apiAuth.user && password === apiAuth.password;

	return isValid;
};

// User-Auth Utils

// check if email already exists in database
const doesEmailAlreadyExist = async (email: string): Promise<boolean> => {
	const existingUser = await getUserByEmail(email);
	const alreadyExists = !!existingUser || existingUser?.email === email;

	console.log("existingUser(does email exist:)", existingUser);

	return alreadyExists;
};

// returns signed security token
const generateSecurityToken = (userID: string) => {
	return jwt.sign({ userID }, process.env.JWT_SECRET as Secret, {
		expiresIn: SESSION_LENGTH + "h",
	});
};

/**
 * Compares/validates a give password against the user's password in the db
 * @param userPassword {String} - The password to validate for
 * @param existingUserPassword {String} - Password from database to match against
 * @returns {Boolean} - Returns true|false is passwords match
 */
const validatePassword = async (
	userPassword: string,
	passwordFromDB: string
): Promise<boolean> => {
	// does the provided password (eg. 'userPassword') match whats in the database?
	const passwordsMatch = await bcrypt.compare(userPassword, passwordFromDB);

	return passwordsMatch;
};

// API-AUTH
export { processAuthHeaders, validateAuthHeaders };

// USER-AUTH
export { doesEmailAlreadyExist, generateSecurityToken, validatePassword };
