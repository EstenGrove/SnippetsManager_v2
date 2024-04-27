import React, { useCallback, useState } from "react";
import styles from "../../css/editor/Editor.module.scss";
import CodeMirror from "@uiw/react-codemirror";
// Language Support:
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { nord } from "@uiw/codemirror-theme-nord";
import { languages } from "@codemirror/language-data";

type Props = {};

const initialVal = `
# Custom React Hooks

- Props:
  - val: string
  - onChange: event handler

\`\`\`tsx
const fn = () => {}
\`\`\`

`;

const MD_CONFIG = {
	base: markdownLanguage,
	codeLanguages: languages,
};

const Editor = ({}: Props) => {
	const [editorValue, setEditorValue] = useState<string>(initialVal);
	const handleEditor = useCallback((val: string, viewUpdate) => {
		console.log("Val:", val);
		setEditorValue(val);
	}, []);

	return (
		<div className={styles.Editor}>
			<CodeMirror
				value={editorValue}
				onChange={handleEditor}
				extensions={[markdown(MD_CONFIG)]}
				theme={"dark"}
				lang="markdown"
				basicSetup={{
					syntaxHighlighting: true,
				}}
				// theme={nord}
			/>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Editor;

Editor.defaultProps = {};

Editor.propTypes = {};
