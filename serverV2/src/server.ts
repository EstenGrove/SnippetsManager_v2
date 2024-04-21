import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
// routes
import routes_v1 from "./routes/v1/routes";
import { formatTime } from "./shared/third-party/date-fns";
import { getUserByEmail } from "./db/user/userQueries";

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware(s)
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", routes_v1);

const getter = async () => {
	const result = await getUserByEmail("echo.alchemist.design@gmail.com");
	console.log("result", result);
};

// CRUDE ERROR CATCHING
// ##TODOS:
// - Fix this later & replace w/ proper error handling
process.on("uncaughtException", (err) => {
	console.error(err);
	console.log("❌ Node app experienced an error, prevent app crashing...");
});

app.listen(PORT, () => {
	console.log(
		`✅ Server was loaded/refreshed at ${formatTime(
			new Date()
		)} on port: ${PORT}`
	);
});
