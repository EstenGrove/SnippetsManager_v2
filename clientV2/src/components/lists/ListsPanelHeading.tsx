import React, { ChangeEvent } from "react";
import styles from "../../css/lists/ListsPanelHeading.module.scss";
import PanelHeading from "../shared/PanelHeading";
import PanelSearch from "./PanelSearch";

type Props = {
	numOfLists: number;
	searchVal: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	openNewListDialog: () => void;
};

const ListsPanelHeading = ({
	searchVal,
	handleSearch,
	openNewListDialog,
	numOfLists = 0,
}: Props) => {
	return (
		<div className={styles.ListsPanelHeading}>
			<PanelHeading title="Lists" itemsCount={numOfLists} />
			<PanelSearch searchVal={searchVal} handleSearch={handleSearch} />
			<button
				type="button"
				className={styles.ListsPanelHeading_newList}
				onClick={openNewListDialog}
			>
				New List
			</button>
		</div>
	);
};

export default ListsPanelHeading;

ListsPanelHeading.defaultProps = {};

ListsPanelHeading.propTypes = {};
