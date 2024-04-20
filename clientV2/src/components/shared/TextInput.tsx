import React, { ChangeEvent } from "react";
import styles from "../../css/shared/TextInput.module.scss";

type Props = {
	id: string;
	name: string;
	val: string | null;
	handleChange: (e: ChangeEvent) => void;
	label?: string;
	isDisabled?: boolean;
	isInvalid?: boolean;
};

const TextInput = ({
	id,
	name,
	val,
	label,
	handleChange,
	isDisabled = false,
	isInvalid = false,
}: Props) => {
	return (
		<div className={styles.TextInput}>
			<label htmlFor={id} className={styles.TextInput_label}>
				{label}
			</label>
			<div className={styles.TextInput_inputWrapper}>
				<input
					type="text"
					name={name}
					id={id}
					value={val as string}
					onChange={handleChange}
					className={styles.TextInput_inputWrapper_input}
					disabled={isDisabled}
					aria-invalid={isInvalid}
					data-invalid={isInvalid}
				/>
			</div>
		</div>
	);
};

export default TextInput;

TextInput.defaultProps = {};

TextInput.propTypes = {};
