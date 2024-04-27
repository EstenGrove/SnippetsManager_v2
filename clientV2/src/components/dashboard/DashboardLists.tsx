import { useMemo } from "react";
import styles from "../../css/dashboard/DashboardLists.module.scss";
import ListsPanel from "../lists/ListsPanel";
import { useSelector } from "react-redux";
import { selectUserLists } from "../../features/lists/listsSlice";
import { selectTags } from "../../features/tags/tagsSlice";
import { selectFaves } from "../../features/favorites/favesSlice";
import { selectCurrentUser } from "../../features/currentUser/currentUserSlice";
import SnippetsPanel from "../snippets/SnippetsPanel";
import { selectSnippetCounts } from "../../features/dashboard/dashboardSlice";
import { ISnippetCounts } from "../../features/dashboard/types";
import Editor from "../editor/Editor";

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
			{/* SNIPPETS PANEL */}
			<SnippetsPanel userLists={userLists} currentUser={currentUser} />

			{/* <Editor /> */}
		</div>
	);
};

export default DashboardLists;

DashboardLists.defaultProps = {};

DashboardLists.propTypes = {};
