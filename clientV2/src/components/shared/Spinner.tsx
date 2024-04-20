import { CSSProperties } from "react";
import css from "../../css/shared/SpinnerSM.module.scss";

type Props = {
	color?: string;
	styles?: CSSProperties;
};

const SpinnerSM = ({ color, styles }: Props) => {
	const custom = {
		borderTopColor: color,
		...styles,
	};
	return <div className={css.SpinnerSM} style={custom}></div>;
};

export default SpinnerSM;
