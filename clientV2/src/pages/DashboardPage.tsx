import React, { useCallback, useEffect, useState } from "react";
import styles from "../css/pages/DashboardPage.module.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHotKeys } from "../hooks/useHotKeys";
import { fetchUserLists } from "../features/lists/operations";
import { TUserThunkArgs } from "../features/types";
import { useAppDispatch } from "../store/store";
import { fetchUserTags } from "../features/tags/operations";
import { useAuthSession } from "../hooks/useAuthSession";
import {
	logoutUser,
	selectCurrentUser,
	selectCurrentUserAuth,
} from "../features/currentUser/currentUserSlice";
import { clearRememberMe, logout } from "../utils/utils_auth";
import { fetchSnippetCounts } from "../features/dashboard/operations";
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
import SearchCenter from "../components/searchCenter/SearchCenter";

const DashboardPage = () => {
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const currentAuth = useSelector(selectCurrentUserAuth);
	const navigate = useNavigate();
	const { sessionStatus } = useAuthSession({
		onSuccess: () => {
			console.log("SUCCESS!!!");
			// alert("Success!");
		},
		onReject: () => {
			console.log("FAILED!!!");
			navigate("/login");
		},
		onExpiring: () =>
			alert("Your session is about to end. Wanna stay logged in?"),
	});
	const wasTriggered = useHotKeys(["ctrl", "k"]);
	// const wasTriggered = false;
	const [showSearchCenter, setShowSearchCenter] = useState<boolean>(false);

	const logoutSession = async () => {
		const { sessionID } = sessionStatus;
		const token = sessionStatus?.token;
		const wasLoggedOut = await logout(sessionID as string, token as string);
		dispatch(logoutUser());
		navigate("/login");
		clearRememberMe();
		if (wasLoggedOut) {
			console.log(`✅ Success! ${currentUser?.username} was logged out!`);
		} else {
			console.log(
				`❌ Issue Occurred! ${currentUser?.username} was not logged out!`
			);
		}
	};

	// fetch: user lists, tags, etc
	const getInitialResources = async () => {
		const { token } = currentAuth;
		const { userID } = currentUser;
		const args = { token, userID } as TUserThunkArgs;

		dispatch(fetchUserLists(args));
		dispatch(fetchUserTags(args));
		dispatch(fetchSnippetCounts(args));
	};

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (wasTriggered) {
			setShowSearchCenter(true);
		}

		return () => {
			isMounted = false;
		};
	}, [wasTriggered]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		getInitialResources();

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

			{showSearchCenter && (
				<SearchCenter closeSearchCenter={() => setShowSearchCenter(false)} />
			)}

			<LogoutButton logout={logoutSession} />
		</div>
	);
};

export default DashboardPage;

DashboardPage.defaultProps = {};

DashboardPage.propTypes = {};
