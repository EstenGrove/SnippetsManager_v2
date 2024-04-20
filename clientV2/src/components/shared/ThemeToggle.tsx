import React, { ChangeEvent } from "react";
import styles from "../../css/shared/ThemeToggle.module.scss";
import sprite from "../../assets/icons/all.svg";

type TSwitchSize = "XSM" | "SM" | "MD" | "LG" | "XLG";

type Props = {
	name: string;
	id: string;
	val: boolean;
	handleCheckbox: (e: ChangeEvent) => void;
	isDisabled?: boolean;
	size?: TSwitchSize;
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

const getStyleColor = (val: boolean) => {
	return {
		backgroundColor: val ? "var(--accent)" : "#eaecef",
	};
};

const dark = "brightness_2";
const light = "wb_sunny";

const ThemeToggle = ({
	name,
	id,
	val,
	handleCheckbox,
	isDisabled = false,
	size = "MD",
}: Props) => {
	const customStyles = {
		...SIZES[size],
	};
	return (
		<div className={styles.ThemeToggle} style={customStyles}>
			<input
				type="checkbox"
				name={name}
				id={id}
				checked={val}
				onChange={handleCheckbox}
				className={styles.ThemeToggle_input}
				disabled={isDisabled}
			/>
			<label
				htmlFor={id}
				className={styles.ThemeToggle_label}
				style={getStyleColor(val)}
			>
				<svg className={styles.ThemeToggle_label_icon}>
					<use xlinkHref={`${sprite}#icon-${val ? dark : light}`}></use>
				</svg>
			</label>
		</div>
	);
};

export default ThemeToggle;

ThemeToggle.defaultProps = {};

ThemeToggle.propTypes = {};
