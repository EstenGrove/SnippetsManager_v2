import React, { ChangeEvent, useState } from "react";
import styles from "../../css/snippets/SnippetsContentPanel.module.scss";
import { ISnippetCounts } from "../../features/dashboard/types";
import { IUserList } from "../../features/lists/types";
import { ICurrentUser } from "../../features/currentUser/types";
// components
import SnippetsPanelHeading from "./SnippetsPanelHeading";
import SnippetsPanelFilters from "./SnippetsPanelFilters";
import { ISnippet } from "../../features/snippets/types";
import SnippetsList from "./SnippetsList";

type Props = {
	currentList: IUserList;
	currentUser: ICurrentUser;
	snippets: ISnippet[];
	snippetCounts: ISnippetCounts;
};

const getCountFromData = (listID: number, counts: ISnippetCounts) => {
	const entry = counts?.[listID];
	if (entry) {
		return entry?.count ?? 0;
	} else {
		return 0;
	}
};

const SnippetsContentPanel = ({
	currentList,
	currentUser,
	snippets,
	snippetCounts,
}: Props) => {
	const [searchVal, setSearchVal] = useState<string>("");
	const [relativeDateRange, setRelativeDateRange] = useState("All");

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchVal(e.target.value);
	};

	const handleDateRange = (option: string) => {
		setRelativeDateRange(option);
	};

	console.log("snippets", snippets);

	return (
		<div className={styles.SnippetsContentPanel}>
			<SnippetsPanelHeading
				title={currentList.listName}
				createdDate={currentList.createdDate as string}
				searchVal={searchVal}
				handleSearch={handleSearch}
				numOfSnippets={getCountFromData(currentList.listID, snippetCounts)}
			/>
			<SnippetsPanelFilters
				relativeDateRange={relativeDateRange}
				handleDateRange={handleDateRange}
			/>
			<SnippetsList snippets={snippets} />
			{/*  */}
			{/*  */}
		</div>
	);
};

export default SnippetsContentPanel;

SnippetsContentPanel.defaultProps = {};

SnippetsContentPanel.propTypes = {};
