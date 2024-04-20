import { fetchWithAuth } from "./utils_auth";
import { auth, currentEnv, user } from "./utils_env";

export type TRegisterFields = {
	username: string;
	email: string;
	password: string;
};

const registerUser = async (userValues: TRegisterFields) => {
	const { username, password, email } = userValues;
	let url = currentEnv.base + auth.register;
	url += "?" + new URLSearchParams({ username, email });
	url += "&password=" + encodeURIComponent(password);

	try {
		const request = await fetchWithAuth(url, {
			method: "POST",
		});
		const response = await request.json();
		console.log("response", response);
		return response;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};

const getUserDetails = async (token: string, userID: string) => {
	let url = currentEnv.base + user.userDetails;
	url += "?" + new URLSearchParams({ userID });
	try {
		const request = await fetchWithAuth(url, {
			token: token,
		});
		const response = await request.json();
		return response.Data;
	} catch (error) {
		console.log("error", error);
		return error;
	}
};

export {
	registerUser,
	// User Details
	getUserDetails,
};
