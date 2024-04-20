import { CSSProperties, MutableRefObject, ReactNode } from "react";
import css from "../../css/shared/Button.module.scss";

type Props = {
	type?: "button" | "submit";
	btnRef?: MutableRefObject<HTMLButtonElement> | null;
	children?: ReactNode;
	isDisabled?: boolean;
	styles?: CSSProperties | object;
	handleClick: (e: MouseEvent) => void;
};

const Button = ({
	btnRef = null,
	type = "button",
	children,
	isDisabled,
	handleClick,
	styles = {},
}: Props) => {
	return (
		<button
			ref={btnRef}
			type={type}
			disabled={isDisabled}
			className={css.Button}
			style={styles}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;

Button.defaultProps = {};

Button.propTypes = {};
