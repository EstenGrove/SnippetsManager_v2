import { ChangeEvent, RefObject } from "react";
import styles from "../../css/shared/TextInput.module.scss";

type Props = {
	id: string;
	name: string;
	val: string | null;
	label?: string;
	handleChange?: (e: ChangeEvent) => void;
	isDisabled?: boolean;
	isInvalid?: boolean;
	isReadOnly?: boolean;
	inputRef?: RefObject<HTMLInputElement> | null;
	placeholder?: string;
};

const TextInput = ({
	id,
	name,
	val,
	label,
	handleChange,
	isDisabled = false,
	isInvalid = false,
	isReadOnly = false,
	inputRef = null,
	placeholder,
	...rest
}: Props) => {
	return (
		<div className={styles.TextInput}>
			<label htmlFor={id} className={styles.TextInput_label}>
				{label}
			</label>
			<div className={styles.TextInput_inputWrapper}>
				<input
					type="text"
					ref={inputRef}
					name={name}
					id={id}
					value={val as string}
					onChange={handleChange}
					className={styles.TextInput_inputWrapper_input}
					disabled={isDisabled}
					readOnly={isReadOnly}
					placeholder={placeholder}
					aria-invalid={isInvalid}
					data-invalid={isInvalid}
					{...rest}
				/>
			</div>
		</div>
	);
};

export default TextInput;

TextInput.defaultProps = {};

TextInput.propTypes = {};
