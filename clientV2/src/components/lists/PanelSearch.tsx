import React, { ChangeEvent } from "react";
import styles from "../../css/lists/PanelSearch.module.scss";
import sprite from "../../assets/icons/all.svg";
import SearchInput from "../shared/SearchInput";

type Props = {
	searchVal: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PanelSearch = ({ searchVal, handleSearch }: Props) => {
	return (
		<div className={styles.PanelSearch}>
			<SearchInput
				key="searchLists"
				name="searchLists"
				id="searchLists"
				searchVal={searchVal}
				handleSearch={handleSearch}
			/>
		</div>
	);
};

export default PanelSearch;

PanelSearch.defaultProps = {};

PanelSearch.propTypes = {};
