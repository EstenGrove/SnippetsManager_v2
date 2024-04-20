import React, {
	MutableRefObject,
	ReactNode,
	RefObject,
	useEffect,
	useRef,
} from "react";
import styles from "../../css/shared/Dialog.module.scss";
import sprite from "../../assets/icons/alerts.svg";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export type TDialogType = "ERROR" | "WARN" | "CONFIRM" | "NOTICE" | "INFO";

type Props = {
	type?: TDialogType;
	title?: string;
	icon?: string;
	footer?: ReactNode;
	children?: ReactNode;
	closeDialog: () => void;
};

const ICONS = {
	type: {
		ERROR: "error", // error_outline
		WARN: "warning",
		CONFIRM: "check_circle",
		NOTICE: "",
		INFO: "info1", // info_outline
	},
	names: {
		error: "error",
		errorOutline: "error_outline",
		warn: "warn",
		confirm: "check_circle",
		info: "info1",
		infoOutline: "info_outline",
	},
};

const getIcon = (type: string, icon?: string) => {
	if (!icon || icon === "") {
		// use default
		const { type: types } = ICONS;
		return types[type as keyof object];
	} else {
		// allow icon prop to override default
		const { names } = ICONS;
		if (
			!ICONS.names[icon] ||
			!Object.prototype.hasOwnProperty.call(names, icon)
		)
			return getIcon(type, null);
		return names[icon as keyof object];
	}
};

export interface IDialog {
	show: boolean;
	title: string | null;
	msg: string | null;
}

const Dialog = ({
	type = "INFO",
	icon,
	title,
	closeDialog,
	footer,
	children,
}: Props) => {
	const dialogRef = useRef<HTMLElement>(null);
	const isOutside = useOutsideClick(dialogRef as MutableRefObject<HTMLElement>);

	// close upon outside click
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (isOutside) {
			closeDialog();
		}

		return () => {
			isMounted = false;
		};
	}, [closeDialog, isOutside]);

	return (
		<aside ref={dialogRef} data-dialog={type} className={styles.Dialog}>
			<div className={styles.Dialog_top}>
				<svg className={styles.Dialog_top_close}>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</div>
			<div className={styles.Dialog_header}>
				<div className={styles.Dialog_header_iconWrapper}>
					<svg className={styles.Dialog_header_iconWrapper_icon}>
						<use xlinkHref={`${sprite}#icon-${getIcon(type, icon)}`}></use>
					</svg>
				</div>
				<h2 className={styles.Dialog_header_title}>{title}</h2>
			</div>
			<div className={styles.Dialog_content}>{children}</div>
			<div className={styles.Dialog_footer}>{footer}</div>
		</aside>
	);
};

export default Dialog;

Dialog.defaultProps = {};

Dialog.propTypes = {};
