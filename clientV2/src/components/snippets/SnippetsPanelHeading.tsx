import { ChangeEvent } from "react";
import styles from "../../css/snippets/SnippetsPanelHeading.module.scss";
import SearchInput from "../shared/SearchInput";
import PanelTitle from "../shared/PanelTitle";

type Props = {
	title: string;
	searchVal: string;
	createdDate: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	numOfSnippets: number;
};

const SnippetsPanelHeading = ({
	title,
	createdDate,
	searchVal,
	handleSearch,
	numOfSnippets = 0,
}: Props) => {
	return (
		<div className={styles.SnippetsPanelHeading}>
			<PanelTitle
				title={title}
				createdDate={createdDate}
				snippetsCount={numOfSnippets}
			/>
			<div className={styles.SnippetsPanelHeading_search}>
				<SearchInput
					name="searchListSnippets"
					id="searchListSnippets"
					searchVal={searchVal}
					handleSearch={handleSearch}
					placeholder="Search snippets in this list..."
					styles={{ height: "3.5rem" }}
				/>
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default SnippetsPanelHeading;

SnippetsPanelHeading.defaultProps = {};

SnippetsPanelHeading.propTypes = {};
