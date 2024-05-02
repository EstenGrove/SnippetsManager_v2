import React, { useState } from "react";
import styles from "../../css/editor/EditorToolbar.module.scss";
import Selector from "../shared/Selector";

type Props = {
	handleLang: (lang: string) => void;
};

// REQUIREMENTS:
// - <details></details> block button
// - Markdown table
// - Blockquote
// - Lists
// - Divider

const EditorToolbar = ({ handleLang }: Props) => {
	return (
		<div className={styles.EditorToolbar}>
			{/*  */}
			{/*  */}
			<div className={styles.EditorToolbar_tags}>
				{/*  */}
				{/*  */}
				{/*  */}
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
