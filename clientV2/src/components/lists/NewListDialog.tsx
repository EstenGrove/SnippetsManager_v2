import {
	useRef,
	useEffect,
	ChangeEvent,
	ChangeEventHandler,
	FormEvent,
} from "react";
import styles from "../../css/lists/NewListDialog.module.scss";
import { useHotKeys } from "../../hooks/useHotKeys";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import TextInput from "../shared/TextInput";
import Button from "../shared/Button";

type Props = {
	newListVal: string;
	closeDialog: () => void;
	handleNewList: (e: ChangeEvent<HTMLInputElement>) => void;
	saveNewList: (e: FormEvent) => void;
};

const NewListDialog = ({
	newListVal,
	handleNewList,
	saveNewList,
	closeDialog,
}: Props) => {
	const dialogRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const wasEscaped: boolean = useHotKeys(["Escape"]);
	const isOutsideClick = useOutsideClick(dialogRef);

	// focus input onMount
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (inputRef.current) {
			inputRef.current.focus();
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// close dialog on 'ESC' or outside click
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (wasEscaped || isOutsideClick) {
			closeDialog();
		}

		return () => {
			isMounted = false;
		};
	}, [closeDialog, wasEscaped, isOutsideClick]);

	return (
		<div ref={dialogRef} className={styles.NewListDialog}>
			<div className={styles.NewListDialog_top}>
				<h4>New List</h4>
			</div>

			<form onSubmit={saveNewList} className={styles.NewListDialog_main}>
				<TextInput
					name="newList"
					id="newList"
					label="Add a list name"
					val={newListVal}
					inputRef={inputRef}
					handleChange={handleNewList as ChangeEventHandler}
				/>
				<div className={styles.NewListDialog_extra}>
					<i>Press enter to save or click 'Save' button</i>
				</div>
			</form>
			<div className={styles.NewListDialog_actions}>
				<Button isDisabled={!newListVal} handleClick={saveNewList}>
					Save
				</Button>
			</div>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default NewListDialog;

NewListDialog.defaultProps = {};

NewListDialog.propTypes = {};
