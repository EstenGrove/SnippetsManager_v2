import React, { useMemo } from "react";
import styles from "../../css/dashboard/DashboardLists.module.scss";
import ListsPanel from "../lists/ListsPanel";
import { useSelector } from "react-redux";
import { selectUserLists } from "../../features/lists/listsSlice";
import { selectTags } from "../../features/tags/tagsSlice";
import { selectFaves } from "../../features/favorites/favesSlice";

type Props = {};

// CONSIDER MULTIPLE VIEW TYPES:
// - List View: <ListsPanel/>
// - Grid View: grid of list cards

const DashboardLists = ({}: Props) => {
	// user lists
	const userLists = useSelector(selectUserLists);
	const userTags = useSelector(selectTags);
	// favorites
	const userFaves = useSelector(selectFaves);
	const { lists } = userFaves;
	const faveListIDs: Array<number> = useMemo(() => {
		if (!lists || lists?.length <= 0) return [];
		return lists.map(({ listID }) => listID);
	}, [lists]);

	return (
		<div className={styles.DashboardLists}>
			<ListsPanel
				userLists={userLists}
				userTags={userTags}
				favesList={faveListIDs}
			/>
			{/* SNIPPETS PANEL */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DashboardLists;

DashboardLists.defaultProps = {};

DashboardLists.propTypes = {};
