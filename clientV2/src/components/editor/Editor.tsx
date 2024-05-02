import { RefObject } from "react";
import styles from "../../css/editor/Editor.module.scss";
import EditorInput from "./EditInput";
import EditorToolbar from "./EditorToolbar";

type Props = {
	editorRef: RefObject<HTMLTextAreaElement>;
	handleLang: (lang: string) => void;
};

const Editor = ({ editorRef, handleLang }: Props) => {
	return (
		<div className={styles.Editor}>
			<div className={styles.Editor_toolbar}>
				<EditorToolbar handleLang={handleLang} />
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
