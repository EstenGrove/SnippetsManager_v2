import React from "react";
import styles from "../../css/shared/EmptyData.module.scss";
// import sprite from "../../assets/icons/all.svg";
import sprite from "../../assets/icons/all.svg";

type Props = {
	icon?: string;
	msg?: string;
};

const icons = {
	empty: "not_listed_location",
	noData: "not_interested",
};

const EmptyData = ({
	msg = "No data was found this selection.",
	icon = "noData",
}: Props) => {
	return (
		<div className={styles.EmptyData}>
			<div className={styles.EmptyData_iconWrapper}>
				<svg className={styles.EmptyData_iconWrapper_icon}>
					<use
						xlinkHref={`${sprite}#icon-${icons[icon as keyof object]}`}
					></use>
				</svg>
			</div>
			<div className={styles.EmptyData_info}>
				<p className={styles.EmptyData_info_msg}>{msg}</p>
			</div>
			{/*  */}
		</div>
	);
};

export default EmptyData;

EmptyData.defaultProps = {};

EmptyData.propTypes = {};
