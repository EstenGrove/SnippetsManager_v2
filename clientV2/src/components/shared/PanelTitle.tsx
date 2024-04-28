import React from "react";
import styles from "../../css/shared/PanelTitle.module.scss";
import {
	formatDateTime,
	getRelativeDistanceToNow,
} from "../../utils/utils_dates";

type Props = {
	title: string;
	snippetsCount: number;
	createdDate: string;
};

// REQUIREMENTS:
// - meta data:
// 		- Last updated
// 		- Created date

const PanelTitle = ({ title, createdDate, snippetsCount = 0 }: Props) => {
	return (
		<div className={styles.PanelTitle}>
			<div className={styles.PanelTitle_wrapper}>
				<h2 className={styles.PanelTitle_wrapper_title}>{title}</h2>
				<span className={styles.PanelTitle_wrapper_count}>
					({snippetsCount})
				</span>
			</div>
			<div
				className={styles.PanelTitle_meta}
				title={formatDateTime(createdDate, "extraShortAndLong")}
			>
				Created about {createdDate && getRelativeDistanceToNow(createdDate)}
			</div>
		</div>
	);
};

export default PanelTitle;

PanelTitle.defaultProps = {};

PanelTitle.propTypes = {};
