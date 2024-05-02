import React, { ReactNode } from "react";
import styles from "../../css/lists/ListsMainPanel.module.scss";

type Props = { children?: ReactNode };

const ListsMainPanel = ({ children }: Props) => {
	return (
		<div className={styles.ListsMainPanel}>
			<div className={styles.ListsMainPanel_main}>{children}</div>
		</div>
	);
};

export default ListsMainPanel;

ListsMainPanel.defaultProps = {};

ListsMainPanel.propTypes = {};
