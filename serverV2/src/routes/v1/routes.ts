import express from "express";
import {
	loginUser,
	registerUser,
	checkAuth,
	logoutUser,
} from "../../controllers/auth/authController";
import {
	getUserLists,
	saveNewUserList,
} from "../../controllers/lists/listsController";
import { getUserTags } from "../../controllers/tags/tagsController";
import {
	getSnippetsByList,
	saveNewSnippet,
} from "../../controllers/snippets/snippetsController";

const app = express();

// PRIMARY ROUTES EXPORT
// - Import all controlled routes here
// - Then export this as v1 routes to be consumed in the 'server.ts' file

app.use("/Login", loginUser);
app.use("/Logout", logoutUser);
app.use("/Register", registerUser);
app.use("/CheckAuth", checkAuth);

// Get: Lists, Tags, Snippets
app.use("/GetUserTags", getUserTags);
app.use("/GetUserLists", getUserLists);
app.use("/GetListSnippets", getSnippetsByList);
// Update: Lists, Tags, Snippets
app.use("/SaveNewUserList", saveNewUserList);
app.use("/SaveNewSnippet", saveNewSnippet);

// Export the app w/ routes
export default app;
