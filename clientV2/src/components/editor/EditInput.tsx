import { ClipboardEvent, KeyboardEvent, RefObject } from "react";
import styles from "../../css/editor/EditorInput.module.scss";

type Props = {
	inputRef: RefObject<HTMLTextAreaElement>;
};

// normalizes extraneous spaces when pasting code/text by removing them
const formatPastedText = (text: string) => {
	const newText = text.trim().replace(/\t/gm, "  ");
	return newText;
};

// inserts text at a given cursor position
// NOTE: MUST NORMALIZE UN-FORMATTED TEXT PRIOR TO CALLING THIS FN
const insertTextAtCursor = (
	inputRef: RefObject<HTMLTextAreaElement>,
	text: string
) => {
	const input = inputRef.current;

	if (input) {
		const start = input.selectionStart;
		const end = input.selectionEnd;
		input.value =
			input.value.substring(0, start) + text + input.value.substring(end);
	}
};

const EditorInput = ({ inputRef }: Props) => {
	// handles tabs within the input
	const tabHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		const tabKey = "Tab";
		const input = inputRef.current;
		const hasShift = e.shiftKey && e.shiftKey === true;

		switch (true) {
			// Tab, only: insert 2 spaces & move cursor to end
			case !hasShift && e.key === tabKey: {
				e.preventDefault();
				if (input) {
					const tabSpace = "  ";
					insertTextAtCursor(inputRef, tabSpace);
					break;
				}
				insertTextAtCursor(inputRef, "");
				break;
			}
			// Shift+Tab, move cursor back 1 space
			case hasShift && e.key === tabKey: {
				e.preventDefault();

				if (input) {
					const end = input.selectionEnd;
					input.selectionEnd = end - 2;
					break;
				}
				break;
			}

			default:
				break;
		}
	};

	const pasteHandler = (e: ClipboardEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		const input = inputRef.current;
		const pasteContent = e.clipboardData.getData("text");

		// prevent 'paste', extrac the content, format it, then append to the input's value
		if (input) {
			const start = input.selectionStart;
			const end = input.selectionEnd;
			const cleanPaste = formatPastedText(pasteContent);
			input.value =
				input.value.substring(0, start) +
				cleanPaste +
				input.value.substring(end);

			// auto-resize input to fit pasted text
			input.style.height = input.scrollHeight + "px";
		}
	};

	return (
		<div className={styles.EditorInput}>
			<textarea
				ref={inputRef}
				name="code"
				id="code"
				onKeyDown={tabHandler}
				onPaste={pasteHandler}
				className={styles.EditorInput_input}
				placeholder="// Add code snippet here..."
				spellCheck={false}
				autoComplete="true"
			></textarea>
		</div>
	);
};

export default EditorInput;

EditorInput.defaultProps = {};

EditorInput.propTypes = {};
