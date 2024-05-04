import { RefObject } from "react";
import styles from "../../css/editor/Editor.module.scss";
import EditorInput from "./EditInput";
import EditorToolbar from "./EditorToolbar";
import { IUserList } from "../../features/lists/types";

type Props = {
	editorRef: RefObject<HTMLTextAreaElement>;
	userLists: IUserList[];
	currentListName: string;
	handleLang: (lang: string) => void;
	handleList: (listName: string) => void;
};

const Editor = ({
	editorRef,
	handleLang,
	handleList,
	userLists,
	currentListName,
}: Props) => {
	return (
		<div className={styles.Editor}>
			<div className={styles.Editor_toolbar}>
				<EditorToolbar
					userLists={userLists}
					handleLang={handleLang}
					handleList={handleList}
					currentListName={currentListName}
				/>
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
