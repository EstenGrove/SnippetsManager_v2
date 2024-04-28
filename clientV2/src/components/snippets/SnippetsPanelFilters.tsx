import React from "react";
import styles from "../../css/snippets/SnippetsPanelFilters.module.scss";
import Selector from "../shared/Selector";

type Props = {
	relativeDateRange: string;
	handleDateRange: (option: string) => void;
};

const dateFilters = ["All", "Today", "Last 7 days", "Last 30 days"];

// FILTERS:
// - Tags Selector
// - Date range quick selector (eg. 'last 30 days', 'today', 'last 60 days' etc)
// - Search input

const SnippetsPanelFilters = ({
	relativeDateRange,
	handleDateRange,
}: Props) => {
	return (
		<div className={styles.SnippetsPanelFilters}>
			<div className={styles.SnippetsPanelFilters_option}>
				<label htmlFor="relativeDateRange">Show snippets for</label>
				<Selector
					initialVal={relativeDateRange}
					selectOption={handleDateRange}
					placeholder="Filter by date range..."
					options={dateFilters}
				/>
			</div>
			<div className={styles.SnippetsPanelFilters_option}>
				{/* TAGS FILTERS */}
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default SnippetsPanelFilters;

SnippetsPanelFilters.defaultProps = {};

SnippetsPanelFilters.propTypes = {};
