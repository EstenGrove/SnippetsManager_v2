import { ReactNode, useMemo } from "react";
import styles from "../../css/layout/AccordionButton.module.scss";
import sprite from "../../assets/icons/dashboard.svg";

type Props = {
	toggleSection?: () => void;
	isOpen?: boolean;
	children?: ReactNode;
};
// type Props = Pick<
// 	InferProps<{ isOpen: boolean; children?: ReactChildren }>,
// 	never
// >;

const AccordionButton = ({
	children,
	toggleSection,
	isOpen = false,
}: Props) => {
	const css = useMemo(() => {
		return {
			transform: isOpen ? `rotateZ(-180deg)` : `rotateZ(0deg)`,
			transition: `all .3s ease-in-out`,
		};
	}, [isOpen]);
	return (
		<button
			type="button"
			onClick={toggleSection}
			className={styles.AccordionButton}
			data-expanded={isOpen}
			aria-expanded={isOpen}
		>
			<span>{children}</span>
			<svg className={styles.AccordionButton_icon} style={css}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_down`}></use>
			</svg>
		</button>
	);
};

export default AccordionButton;

AccordionButton.defaultProps = {};

AccordionButton.propTypes = {};
