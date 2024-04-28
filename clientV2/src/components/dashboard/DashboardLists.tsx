import styles from "../../css/dashboard/DashboardLists.module.scss";
import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserLists } from "../../features/lists/listsSlice";
import { selectTags } from "../../features/tags/tagsSlice";
import { selectFaves } from "../../features/favorites/favesSlice";
import { selectCurrentUser } from "../../features/currentUser/currentUserSlice";
import { selectSnippetCounts } from "../../features/dashboard/dashboardSlice";
import { ISnippetCounts } from "../../features/dashboard/types";
import Editor from "../editor/Editor";
import ListsPanel from "../lists/ListsPanel";
import SnippetsPanel from "../snippets/SnippetsPanel";
import ListsMainPanel from "../lists/ListsMainPanel";
import DashboardNav from "./DashboardNav";
import CurrentSnippetPanel from "../snippets/CurrentSnippetPanel";

// CONSIDER MULTIPLE VIEW TYPES:
// - List View: <ListsPanel/>
// - Grid View: grid of list cards

const DashboardLists = () => {
	// user lists
	const currentUser = useSelector(selectCurrentUser);
	const userLists = useSelector(selectUserLists);
	const userTags = useSelector(selectTags);
	const snippetCounts = useSelector(selectSnippetCounts);
	// favorites
	const userFaves = useSelector(selectFaves);
	const { lists } = userFaves;
	const faveListIDs: Array<number> = useMemo(() => {
		if (!lists || lists?.length <= 0) return [];
		return lists.map(({ listID }) => listID);
	}, [lists]);

	return (
		<div className={styles.DashboardLists}>
			{/* LISTS PANEL */}
			<ListsPanel
				userLists={userLists}
				userTags={userTags}
				favesList={faveListIDs}
				currentUser={currentUser}
				snippetCounts={snippetCounts as ISnippetCounts}
			/>

			{/* MAIN CONTENT PANEL - SNIPPETS LIST OR CURRENT SNIPPET */}
			<ListsMainPanel key="LISTS-MAIN-PANEL">
				<DashboardNav />
				<Routes>
					<Route
						index
						path="/:listID"
						element={
							<SnippetsPanel
								userLists={userLists}
								currentUser={currentUser}
								snippetCounts={snippetCounts as ISnippetCounts}
							/>
						}
					/>
					<Route
						// path="/:listID/:snippetID"
						path="/:listID/:snippetID"
						element={
							<CurrentSnippetPanel
								userLists={userLists}
								currentUser={currentUser}
								snippetCounts={snippetCounts as ISnippetCounts}
							/>
						}
					/>
				</Routes>
				{/* <Editor /> */}
			</ListsMainPanel>
		</div>
	);
};

export default DashboardLists;

DashboardLists.defaultProps = {};

DashboardLists.propTypes = {};
