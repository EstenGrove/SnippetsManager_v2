import React, { ReactNode } from "react";
import styles from "../../css/shared/PanelList.module.scss";

type Props = {
	children?: ReactNode;
};

const PanelList = ({ children }: Props) => {
	return (
		<div className={styles.PanelList}>
			<div className={styles.PanelList_inner}>{children}</div>
		</div>
	);
};

export default PanelList;

PanelList.defaultProps = {};

PanelList.propTypes = {};
