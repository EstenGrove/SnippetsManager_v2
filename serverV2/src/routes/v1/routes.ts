import express from "express";
import {
	loginUser,
	registerUser,
	checkAuth,
	logoutUser,
} from "../../controllers/auth/authController";
import { getUserLists } from "../../controllers/lists/listsController";
import { getUserTags } from "../../controllers/tags/tagsController";

const app = express();

// PRIMARY ROUTES EXPORT
// - Import all controlled routes here
// - Then export this as v1 routes to be consumed in the 'server.ts' file

app.use("/Login", loginUser);
app.use("/Logout", logoutUser);
app.use("/Register", registerUser);
app.use("/CheckAuth", checkAuth);

// Lists, Tags
app.use("/GetUserTags", getUserTags);
app.use("/GetUserLists", getUserLists);

// Export the app w/ routes
export default app;
