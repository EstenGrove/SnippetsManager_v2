import React from "react";
import styles from "../../css/dashboard/DashboardNav.module.scss";
import sprite from "../../assets/icons/all.svg";
import { useNavigate } from "react-router-dom";

const DashboardNav = () => {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<div className={styles.DashboardNav}>
			<button
				type="button"
				onClick={goBack}
				className={styles.DashboardNav_btn}
			>
				<svg className={styles.DashboardNav_btn_back}>
					<use xlinkHref={`${sprite}#icon-arrow_back`}></use>
				</svg>
			</button>
		</div>
	);
};

export default DashboardNav;

DashboardNav.defaultProps = {};

DashboardNav.propTypes = {};
