import React from "react";
import styles from "../../css/dashboard/DashboardLists.module.scss";
import ListsPanel from "../lists/ListsPanel";

type Props = {};

// CONSIDER MULTIPLE VIEW TYPES:
// - List View: <ListsPanel/>
// - Grid View: grid of list cards

const DashboardLists = ({}: Props) => {
	// user lists
	return (
		<div className={styles.DashboardLists}>
			<ListsPanel />
			<h1>Lists</h1>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default DashboardLists;

DashboardLists.defaultProps = {};

DashboardLists.propTypes = {};
