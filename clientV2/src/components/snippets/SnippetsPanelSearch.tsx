import React, { ChangeEvent } from "react";
import styles from "../../css/snippets/SnippetsPanelSearch.module.scss";
import sprite from "../../assets/icons/all.svg";

type Props = {
	searchVal: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SnippetsPanelSearch = ({ searchVal, handleSearch }: Props) => {
	return (
		<div className={styles.SnippetsPanelSearch}>
			<div className={styles.SnippetsPanelSearch_inputWrapper}>
				<svg className={styles.SnippetsPanelSearch_inputWrapper_icon}>
					<use xlinkHref={`${sprite}#icon-search`}></use>
				</svg>
				<input
					type="text"
					id="searchListSnippets"
					name="searchListSnippets"
					value={searchVal}
					onChange={handleSearch}
					className={styles.SnippetsPanelSearch_inputWrapper_input}
					placeholder="Search for snippets..."
				/>
			</div>
		</div>
	);
};

export default SnippetsPanelSearch;

SnippetsPanelSearch.defaultProps = {};

SnippetsPanelSearch.propTypes = {};
