import { ChangeEvent } from "react";
import styles from "../../css/shared/Checkbox.module.scss";

type Props = {
	label?: string;
	name: string;
	id: string;
	val: boolean;
	handleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ label, name, id, val, handleCheckbox }: Props) => {
	return (
		<div className={styles.Checkbox}>
			{/*  */}
			<input
				type="checkbox"
				name={name}
				id={id}
				checked={val}
				className={styles.Checkbox_input}
				onChange={handleCheckbox}
			/>
			<label htmlFor={id} className={styles.Checkbox_label}>
				{label}
			</label>
		</div>
	);
};

export default Checkbox;

Checkbox.defaultProps = {};

Checkbox.propTypes = {};
