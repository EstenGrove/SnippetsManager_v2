import React from "react";
import styles from "../../css/snippets/SnippetsList.module.scss";
import { ISnippet } from "../../features/snippets/types";
import SnippetsItem from "./SnippetsItem";
import EmptyData from "../shared/EmptyData";

type Props = {
	snippets: ISnippet[];
};

const SnippetsList = ({ snippets }: Props) => {
	return (
		<div className={styles.SnippetsList}>
			<div className={styles.SnippetsList_cardsList}>
				{!snippets ||
					(snippets?.length <= 0 && (
						<EmptyData msg="No snippets found for this list." />
					))}
				{snippets &&
					snippets.map((snippet) => (
						<SnippetsItem key={snippet.snippetID} snippet={snippet} />
					))}
			</div>
		</div>
	);
};

export default SnippetsList;

SnippetsList.defaultProps = {};

SnippetsList.propTypes = {};
