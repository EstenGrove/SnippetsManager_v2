import React, { ChangeEvent } from "react";
import styles from "../../css/shared/ToggleSwitch.module.scss";

type Props = {
	name: string;
	id: string;
	val: boolean;
	handleCheckbox: (e: ChangeEvent) => void;
	isDisabled?: boolean;
	size?: string;
};

const SIZES = {
	XSM: {
		transform: "scale(.4)",
	},
	SM: {
		transform: "scale(.7)",
	},
	MD: {
		transform: "scale(1)",
	},
	LG: {
		transform: "scale(1.3)",
	},
	XLG: {
		transform: "scale(1.6)",
	},
};

const ToggleSwitch = ({
	name = "toggle",
	id = "toggle",
	val,
	handleCheckbox,
	isDisabled,
	size = "SM",
}: Props) => {
	const css = {
		...SIZES[size],
	};
	return (
		<div className={styles.ToggleSwitch} style={css}>
			<input
				type="checkbox"
				name={name}
				id={id}
				checked={val}
				onChange={handleCheckbox}
				className={styles.ToggleSwitch_input}
				disabled={isDisabled}
			/>
			<label htmlFor={id} className={styles.ToggleSwitch_label}>
				<div data-dot="true" className={styles.ToggleSwitch_label_dot}></div>
			</label>
			{/*  */}
		</div>
	);
};

export default ToggleSwitch;

ToggleSwitch.defaultProps = {};

ToggleSwitch.propTypes = {};
