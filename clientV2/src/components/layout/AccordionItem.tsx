import React, { ReactElement, ReactNode, useState } from "react";
import styles from "../../css/layout/AccordionItem.module.scss";

type Props = {
	children?: ReactNode;
};

const AccordionItem = ({ children }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleSection = () => {
		setIsOpen(!isOpen);
	};

	const withProps = React.Children.map(children, (child) => {
		return React.cloneElement(child as ReactElement, {
			isOpen,
			toggleSection,
		});
	});

	return (
		<div className={styles.AccordionItem}>
			<div className={styles.AccordionItem_inner}>{withProps}</div>
		</div>
	);
};

export default AccordionItem;

AccordionItem.defaultProps = {};

AccordionItem.propTypes = {};
