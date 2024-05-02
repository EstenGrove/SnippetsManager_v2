import { RefObject } from "react";
import styles from "../../css/editor/EditorPanel.module.scss";
import Editor from "./Editor";

type Props = {
	editorRef: RefObject<HTMLTextAreaElement>;
	handleLang: (lang: string) => void;
};

const EditorPanel = ({ editorRef, handleLang }: Props) => {
	return (
		<div className={styles.EditorPanel}>
			<Editor editorRef={editorRef} handleLang={handleLang} />
		</div>
	);
};

export default EditorPanel;

EditorPanel.defaultProps = {};

EditorPanel.propTypes = {};
