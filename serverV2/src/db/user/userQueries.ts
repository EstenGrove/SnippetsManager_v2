import { QueryResult } from "pg";
import pool from "../db";
import { IUserDBRecord } from "../../models/user/types";

const getUserByUserID = async (userID: string) => {
	const query = `SELECT * FROM users WHERE user_id = $1`;
	try {
		const results = await pool.query(query, [userID]);
		const rows = results?.rows ?? [];
		console.log("ROWS", rows);
		return rows?.[0];
	} catch (error) {
		console.log("Error(During query):", error);
		return error;
	}
};

const getUserByEmail = async (email: string) => {
	const query = `SELECT * FROM users WHERE email = $1`;
	try {
		const results = await pool.query(query, [email]);
		const rows = results?.rows ?? [];
		console.log("ROWS", rows);
		return rows?.[0];
	} catch (error) {
		console.log("Error(During query):", error);
		return error;
	}
};

const getUserByUsernameOrEmail = async (usernameOrEmail: string) => {
	const query = `SELECT * FROM users WHERE email = $1 OR username = $1`;
	try {
		const results = await pool.query(query, [usernameOrEmail]);
		const rows = results?.rows ?? [];
		console.log("ROWS", rows);
		return rows?.[0];
	} catch (error) {
		console.log("Error(During query):", error);
		return error;
	}
};

const registerNewUser = async (
	username: string,
	email: string,
	password: string
): Promise<IUserDBRecord[] | unknown> => {
	const columns = `username, email, password, is_active`;
	const query = `INSERT INTO users (${columns}) VALUES ($1, $2, $3, $4) RETURNING user_id, ${columns}`;
	const values = [username, email, password, true];
	try {
		const results = await pool.query(query, values);
		console.log("results", results);
		return results.rows;
	} catch (error: unknown) {
		console.log("Error(During query):", error);
		return error as Error;
	}
};

export interface IDBUserSession {
	user_id: string | null;
	user_token: string | null;
	session_id: string | null;
	login_date: string | null;
	logout_date: string | null;
	is_active: boolean;
}

// creates user_login record for session tracking
const recordUserSession = async (
	userID: string,
	token: string,
	userAgent: string
): Promise<IDBUserSession | unknown> => {
	const columns = `user_id, user_token, user_agent, is_active`;
	const values = [userID, token, userAgent, true];
	const query = `INSERT INTO user_logins (${columns}) VALUES ($1, $2, $3, $4) RETURNING user_id, user_token, session_id, login_date, is_active`;
	try {
		const results = await pool.query(query, values);
		const rows = results?.rows;
		return rows?.[0] as IDBUserSession;
	} catch (error) {
		console.log("error", error);
		// return error;
		return error;
	}
};

const updateUserSession = async (
	sessionID: string
): Promise<IDBUserSession | unknown> => {
	const logoutDate = new Date();
	const query = `UPDATE user_logins SET is_active = $1, logout_date = $2 WHERE session_id = $3 RETURNING is_active, session_id, logout_date`;
	const values = [false, logoutDate, sessionID];
	try {
		const results: QueryResult<any> = await pool.query(query, values);
		const row = results.rows[0] as QueryResult<IDBUserSession>;
		console.log("row", row);
		return row as unknown as IDBUserSession;
	} catch (error: unknown) {
		console.log("error", error);
		return error;
	}
};

export {
	getUserByUserID,
	getUserByEmail,
	getUserByUsernameOrEmail,
	registerNewUser,
	recordUserSession,
	updateUserSession,
};
