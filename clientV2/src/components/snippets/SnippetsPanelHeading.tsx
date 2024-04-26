import React, { ChangeEvent } from "react";
import styles from "../../css/snippets/SnippetsPanelHeading.module.scss";
import PanelHeading from "../shared/PanelHeading";
import PanelSearch from "../lists/PanelSearch";

type Props = {
	searchVal: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	numOfSnippets: number;
};

const SnippetsPanelHeading = ({
	searchVal,
	handleSearch,
	numOfSnippets = 0,
}: Props) => {
	return (
		<div className={styles.SnippetsPanelHeading}>
			<PanelHeading title="Snippets" itemsCount={numOfSnippets} />
			<PanelSearch searchVal={searchVal} handleSearch={handleSearch} />
			<button className={styles.SnippetsPanelHeading_addNewBtn}>
				New Snippet
			</button>
		</div>
	);
};

export default SnippetsPanelHeading;

SnippetsPanelHeading.defaultProps = {};

SnippetsPanelHeading.propTypes = {};
