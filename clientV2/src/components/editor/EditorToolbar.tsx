import { useMemo } from "react";
import styles from "../../css/editor/EditorToolbar.module.scss";
import Selector from "../shared/Selector";
import { IUserList } from "../../features/lists/types";

type Props = {
	userLists: IUserList[];
	currentListName: string;
	handleList: (listName: string) => void;
	handleLang: (lang: string) => void;
};

// REQUIREMENTS:
// - <details></details> block button
// - Markdown table
// - Blockquote
// - Lists
// - Divider

const EditorToolbar = ({
	userLists,
	handleList,
	handleLang,
	currentListName,
}: Props) => {
	const listNames: string[] = useMemo(() => {
		return userLists.map(({ listName }) => listName);
	}, [userLists]);
	return (
		<div className={styles.EditorToolbar}>
			<div className={styles.EditorToolbar_lists}>
				<Selector
					initialVal={currentListName}
					placeholder="Select a list"
					selectOption={handleList}
					options={listNames}
				/>
			</div>
			<div className={styles.EditorToolbar_selector}>
				<Selector
					placeholder="Select syntax"
					selectOption={handleLang}
					options={[
						"tsx (.tsx | .ts)",
						"sql (.sql)",
						"md (.md)",
						"txt (.txt)",
						"css (.css | .scss)",
						"js (.js)",
					]}
				/>
			</div>
		</div>
	);
};

export default EditorToolbar;

EditorToolbar.defaultProps = {};

EditorToolbar.propTypes = {};
