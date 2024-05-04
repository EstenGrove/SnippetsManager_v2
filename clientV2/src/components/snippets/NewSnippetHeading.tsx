import { ChangeEvent, useMemo } from "react";
import styles from "../../css/snippets/NewSnippetHeading.module.scss";
import TextInput from "../shared/TextInput";
import Button from "../shared/Button";

type Props = {
	title: string;
	origin: string;
	handleTitle: (e: ChangeEvent<HTMLInputElement>) => void;
	saveSnippet: () => void;
};

interface IVals {
	origin: string;
	title: string;
}

const shouldDisableBtn = (vals: IVals) => {
	const isReady = Object.values(vals).every((val) => !!val && val !== "");
	return !isReady;
};

const NewSnippetHeading = ({
	title,
	origin,
	handleTitle,
	saveSnippet,
}: Props) => {
	const disableSave = useMemo(() => {
		return shouldDisableBtn({ origin, title });
	}, [title, origin]);
	return (
		<div className={styles.NewSnippetHeading}>
			<div className={styles.NewSnippetHeading_title}>
				<TextInput
					key="title"
					id="title"
					name="title"
					label="Add a title for this snippet"
					val={title}
					handleChange={handleTitle}
				/>
			</div>
			<div className={styles.NewSnippetHeading_origin}>
				<TextInput
					key="origin"
					id="origin"
					name="origin"
					label="Where'd this snippet come from? (eg. url, website etc.)"
					val={origin}
					handleChange={handleTitle}
				/>
			</div>
			<div className={styles.NewSnippetHeading_actions}>
				<Button handleClick={saveSnippet} isDisabled={disableSave}>
					Save Snippet
				</Button>
			</div>
		</div>
	);
};

export default NewSnippetHeading;

NewSnippetHeading.defaultProps = {};

NewSnippetHeading.propTypes = {};
