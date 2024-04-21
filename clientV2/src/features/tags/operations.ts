import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserTags } from "../../utils/utils_tags";
import { TUserThunkArgs } from "../types";
import { IResponse, normalizeTagsForClient } from "../../utils/utils_shared";
import { IServerTag, ITag } from "./types";

interface ITagResponse {
	Data: {
		[key: string]: IServerTag[] | [];
	};
}

const fetchUserTags = createAsyncThunk(
	"tags/fetchUserTags",
	async ({ token, userID }: TUserThunkArgs) => {
		const response = (await getUserTags(token, userID)) as IResponse;
		const rawTags = response?.Data?.UserTags as IServerTag[];
		const userTags = normalizeTagsForClient(rawTags as IServerTag[]);
		return userTags;
	}
);

export { fetchUserTags };
