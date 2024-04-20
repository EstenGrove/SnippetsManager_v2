import React, { ReactNode } from "react";
import styles from "../../css/layout/Accordion.module.scss";

type Props = {
	children?: ReactNode;
};

const Accordion = ({ children }: Props) => {
	return (
		<div className={styles.Accordion}>
			<div className={styles.Accordion_inner}>{children}</div>
		</div>
	);
};

export default Accordion;

Accordion.defaultProps = {};

Accordion.propTypes = {};
