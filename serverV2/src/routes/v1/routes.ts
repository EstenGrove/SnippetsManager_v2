import express from "express";
import {
	loginUser,
	registerUser,
	checkAuth,
	logoutUser,
	refreshAuthSession,
} from "../../controllers/auth/authController";
import {
	getUserLists,
	saveNewUserList,
} from "../../controllers/lists/listsController";
import { getUserTags } from "../../controllers/tags/tagsController";
import {
	getSnippetsByList,
	getSnippetsCountByList,
	saveNewSnippet,
} from "../../controllers/snippets/snippetsController";
import { getLanguages } from "../../controllers/langs/langsController";

const app = express();

// PRIMARY ROUTES EXPORT
// - Import all controlled routes here
// - Then export this as v1 routes to be consumed in the 'server.ts' file

app.use("/Login", loginUser);
app.use("/Logout", logoutUser);
app.use("/Register", registerUser);
app.use("/CheckAuth", checkAuth);
app.use("/RefreshAuth", refreshAuthSession);

// Get(s): Lists, Tags, Snippets
app.use("/GetLangs", getLanguages);
app.use("/GetUserTags", getUserTags);
app.use("/GetUserLists", getUserLists);
app.use("/GetListSnippets", getSnippetsByList);
app.use("/GetSnippetCounts", getSnippetsCountByList);
// Update(s): Lists, Tags, Snippets
app.use("/SaveNewUserList", saveNewUserList);
app.use("/SaveNewSnippet", saveNewSnippet);

// Export the app w/ routes
export default app;
