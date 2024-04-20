import React from "react";
import styles from "../../css/login/LogoutButton.module.scss";
import sprite from "../../assets/icons/all.svg";

type Props = {
	logout: () => void;
};

const LogoutButton = ({ logout }: Props) => {
	return (
		<button type="button" onClick={logout} className={styles.LogoutButton}>
			<svg className={styles.LogoutButton_icon}>
				<use xlinkHref={`${sprite}#icon-exit_to_app`}></use>
			</svg>
		</button>
	);
};

export default LogoutButton;

LogoutButton.defaultProps = {};

LogoutButton.propTypes = {};
