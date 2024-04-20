import { ReactNode } from "react";
import styles from "../../css/layout/AccordionContent.module.scss";

type Props = {
	isOpen?: boolean;
	children?: ReactNode;
};
// type Props = Pick<InferProps<{ isOpen: boolean; children?: ReactNode }>, never>;
// type Props = Pick<{ isOpen: boolean; children?: ReactNode }, never>;
// type Props = <InferProps<{ isOpen: boolean; children?: ReactNode }, never>>;

const AccordionContent = ({ isOpen, children }: Props) => {
	return (
		<div
			className={styles.AccordionContent}
			data-expanded={isOpen}
			aria-expanded={isOpen}
		>
			{children}
		</div>
	);
};

export default AccordionContent;

AccordionContent.defaultProps = {};

AccordionContent.propTypes = {};
