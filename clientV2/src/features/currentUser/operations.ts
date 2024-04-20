import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "../../utils/utils_user";
import { normalizeUserForClient } from "../../utils/utils_shared";
import { TUserThunkArgs } from "../types";

const fetchUserDetails = createAsyncThunk(
	"currentUser/fetchUserDetails",
	async ({ token, userID }: TUserThunkArgs) => {
		const response = await getUserDetails(token, userID);
		const normal = normalizeUserForClient(response);

		return normal;
	}
);

export { fetchUserDetails };
