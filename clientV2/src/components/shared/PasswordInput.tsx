import React, { ChangeEvent, useState } from "react";
import styles from "../../css/shared/PasswordInput.module.scss";
import sprite from "../../assets/icons/all.svg";

type Props = {
	id: string;
	name: string;
	val: string;
	handleChange: (e: ChangeEvent) => void;
	label?: string;
	isDisabled?: boolean;
	isInvalid?: boolean;
};

const show = "remove_red_eye";
const hide = "visibility_off";

const PasswordInput = ({
	id,
	name,
	val,
	label,
	handleChange,
	isDisabled = false,
	isInvalid = false,
}: Props) => {
	const [isHidden, setIsHidden] = useState<boolean>(true);
	const toggleHide = () => {
		setIsHidden(!isHidden);
	};
	return (
		<div className={styles.PasswordInput}>
			<label htmlFor={id} className={styles.PasswordInput_label}>
				{label}
			</label>
			<div className={styles.PasswordInput_inputWrapper}>
				<input
					type={isHidden ? "password" : "text"}
					name={name}
					id={id}
					value={val}
					onChange={handleChange}
					className={styles.PasswordInput_inputWrapper_input}
					disabled={isDisabled}
					aria-invalid={isInvalid}
					data-invalid={isInvalid}
				/>
				<svg
					className={styles.PasswordInput_inputWrapper_icon}
					onClick={toggleHide}
				>
					<use xlinkHref={`${sprite}#icon-${isHidden ? hide : show}`}></use>
				</svg>
			</div>
		</div>
	);
};

export default PasswordInput;

PasswordInput.defaultProps = {};

PasswordInput.propTypes = {};
