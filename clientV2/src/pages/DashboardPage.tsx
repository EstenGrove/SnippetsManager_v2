import React, { useCallback, useEffect } from "react";
import styles from "../css/pages/DashboardPage.module.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthSession } from "../hooks/useAuthSession";
import {
	logoutUser,
	selectCurrentUser,
	selectCurrentUserAuth,
	setCurrentUser,
} from "../features/currentUser/currentUserSlice";
import { clearRememberMe, logout } from "../utils/utils_auth";
// global components
import Sidebar from "../components/navigation/Sidebar";
// route components
import Dashboard from "../components/dashboard/Dashboard";
import DashboardLists from "../components/dashboard/DashboardLists";
import DashboardTags from "../components/dashboard/DashboardTags";
import DashboardFaves from "../components/dashboard/DashboardFaves";
import DashboardSearch from "../components/dashboard/DashboardSearch";
import DashboardSettings from "../components/dashboard/DashboardSettings";
import LogoutButton from "../components/login/LogoutButton";
import { fetchUserLists } from "../features/lists/operations";
import { TUserThunkArgs } from "../features/types";
import { useAppDispatch } from "../store/store";

const DashboardPage = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const currentAuth = useSelector(selectCurrentUserAuth);
	const navigate = useNavigate();
	const { authSession, sessionStatus } = useAuthSession({
		onSuccess: () => {
			console.log("SUCCESS!!!");
			alert("Success!");
		},
		onReject: () => {
			console.log("FAILED!!!");
			navigate("/login");
		},
		onExpiring: () =>
			alert("Your session is about to end. Wanna stay logged in?"),
	});

	const logoutSession = async () => {
		const { sessionID } = sessionStatus;
		const token = sessionStatus?.token;
		const wasLoggedOut = await logout(sessionID as string, token as string);
		if (wasLoggedOut) {
			dispatch(logoutUser());
			navigate("/login");
			clearRememberMe();
			console.log(`✅ Success! ${currentUser?.username} was logged out!`);
		} else {
			alert("Failed!");
		}
	};

	const getInitialResources = () => {
		const { token } = currentAuth;
		const { userID } = currentUser;
		const args = { token, userID } as TUserThunkArgs;
		// lists
		// tags
		dispatch(fetchUserLists(args));
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		// fetch lists
		// fetch tags
		getInitialResources();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<div className={styles.DashboardPage}>
			<Sidebar currentUser={currentUser} />
			<div className={styles.DashboardPage_routes}>
				<Routes>
					<Route path="lists/*" element={<DashboardLists />} />
					<Route path="tags/*" element={<DashboardTags />} />
					<Route path="faves/*" element={<DashboardFaves />} />
					<Route path="search/*" element={<DashboardSearch />} />
					<Route path="settings/*" element={<DashboardSettings />} />
					<Route path="/*" element={<Dashboard />} />
				</Routes>
			</div>
			<LogoutButton logout={logoutSession} />
		</div>
	);
};

export default DashboardPage;

DashboardPage.defaultProps = {};

DashboardPage.propTypes = {};
