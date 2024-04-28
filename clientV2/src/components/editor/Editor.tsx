import React, { useCallback, useRef, useState } from "react";
import styles from "../../css/editor/Editor.module.scss";
import EditorInput from "./EditInput";
import EditorToolbar from "./EditorToolbar";

type Props = {};

const Editor = ({}: Props) => {
	const editorRef = useRef<HTMLTextAreaElement>(null);

	const tabHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		//
		//
	};
	return (
		<div className={styles.Editor}>
			<div className={styles.Editor_toolbar}>
				<EditorToolbar />
			</div>
			<div className={styles.Editor_code}>
				<EditorInput inputRef={editorRef} />
			</div>
			{/*  */}
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Editor;

Editor.defaultProps = {};

Editor.propTypes = {};
