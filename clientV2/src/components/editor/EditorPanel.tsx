import { RefObject } from "react";
import styles from "../../css/editor/EditorPanel.module.scss";
import Editor from "./Editor";
import { IUserList } from "../../features/lists/types";

type Props = {
	editorRef: RefObject<HTMLTextAreaElement>;
	userLists: IUserList[];
	currentListName: string;
	handleLang: (lang: string) => void;
	handleList: (listName: string) => void;
};

const EditorPanel = ({
	editorRef,
	handleLang,
	handleList,
	userLists,
	currentListName,
}: Props) => {
	return (
		<div className={styles.EditorPanel}>
			<Editor
				editorRef={editorRef}
				userLists={userLists}
				handleList={handleList}
				handleLang={handleLang}
				currentListName={currentListName}
			/>
		</div>
	);
};

export default EditorPanel;

EditorPanel.defaultProps = {};

EditorPanel.propTypes = {};
