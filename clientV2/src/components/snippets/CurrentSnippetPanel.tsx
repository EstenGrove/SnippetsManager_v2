import React from "react";
import styles from "../../css/snippets/CurrentSnippetPanel.module.scss";
import { ICurrentUser } from "../../features/currentUser/types";
import { ISnippet } from "../../features/snippets/types";
import { ICurrentList } from "../../features/lists/listsSlice";

type Props = {
	currentList: ICurrentList;
	currentUser: ICurrentUser;
	snippet: ISnippet;
};

const CurrentSnippetPanel = ({ currentList, currentUser, snippet }: Props) => {
	return (
		<div className={styles.CurrentSnippetPanel}>
			<h1 style={{ color: "white" }}>Active Snippet Panel</h1>

			{/*  */}
			{/*  */}
		</div>
	);
};

export default CurrentSnippetPanel;

CurrentSnippetPanel.defaultProps = {};

CurrentSnippetPanel.propTypes = {};
