import React, { useState } from "react";
import styles from "../../css/editor/EditorPanel.module.scss";
import { ISnippet } from "../../features/snippets/types";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/currentUser/currentUserSlice";

type Props = {};

const EditorPanel = ({}: Props) => {
	const currentUser = useSelector(selectCurrentUser);
	// new snippet states
	const [lang, setLang] = useState<string>("tsx");
	const [newSnippet, setNewSnippet] = useState<ISnippet>({
		snippetID: 0,
		languageID: 0,
		snippetName: "",
		snippetDesc: "",
		snippetCode: "",
		snippetOrigin: "",
		isFave: false,
		isActive: true,
		createdDate: new Date().toISOString(),
		updatedDate: null,
		createdBy: currentUser?.userID ?? null,
		updatedBy: null,
	});
	return (
		<div className={styles.EditorPanel}>
			{/* HEADER */}
			{/* EDITOR */}
			{/* ACTIONS */}
		</div>
	);
};

export default EditorPanel;

EditorPanel.defaultProps = {};

EditorPanel.propTypes = {};
