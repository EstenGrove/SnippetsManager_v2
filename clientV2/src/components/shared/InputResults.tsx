import React from "react";
import styles from "../../css/shared/InputResults.module.scss";
import sprite from "../../assets/icons/all.svg";

type Props = {
	issues: string[];
	isValid: boolean;
};

type SuccessProps = {
	msg?: string;
};
type ErrorProps = {
	msg: string;
};

const SuccessMsg = ({ msg = "Looks good!" }: SuccessProps) => {
	return (
		<div className={styles.SuccessMsg}>
			<svg className={styles.SuccessMsg_icon}>
				<use xlinkHref={`${sprite}#icon-check_circle`}></use>
			</svg>
			<div className={styles.ErrorMsg_text}>{msg}</div>
		</div>
	);
};
const ErrorMsg = ({ msg }: ErrorProps) => {
	return (
		<div className={styles.ErrorMsg}>
			<svg className={styles.ErrorMsg_icon}>
				<use xlinkHref={`${sprite}#icon-info_outline`}></use>
			</svg>
			<div className={styles.ErrorMsg_text}>{msg}</div>
		</div>
	);
};

const InputResults = ({ issues, isValid }: Props) => {
	return (
		<div className={styles.InputResults}>
			{!isValid && issues.map((msg, idx) => <ErrorMsg key={idx} msg={msg} />)}
			{isValid && <SuccessMsg />}
		</div>
	);
};

export default InputResults;

InputResults.defaultProps = {};

InputResults.propTypes = {};
