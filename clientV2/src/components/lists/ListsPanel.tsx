import React, { useState } from "react";
import styles from "../../css/lists/ListsPanel.module.scss";
import sprite from "../../assets/icons/all.svg";
import { useWindowSize } from "../../hooks/useWindowSize";

type Props = {};

type ToggleProps = {
	isCollapsed: boolean;
	toggleSidebar: () => void;
};

const PanelToggle = ({ toggleSidebar, isCollapsed = false }: ToggleProps) => {
	const closed = "rotateZ(0)";
	const open = "rotateZ(-180deg)";
	const css = {
		transform: isCollapsed ? closed : open,
		transition: "all .3s ease-in-out",
		transitionDelay: ".3s",
	};
	return (
		<button
			type="button"
			className={styles.PanelToggle}
			onClick={toggleSidebar}
		>
			<svg className={styles.PanelToggle_icon} style={css}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_right`}></use>
			</svg>
		</button>
	);
};
const MobilePanelToggle = ({
	toggleSidebar,
	isCollapsed = false,
}: ToggleProps) => {
	const closed = "rotateZ(0)";
	const open = "rotateZ(-180deg)";
	const css = {
		transform: isCollapsed ? closed : open,
		transition: "all .3s ease-in-out",
		transitionDelay: ".3s",
	};
	return (
		<button
			type="button"
			className={styles.MobilePanelToggle}
			onClick={toggleSidebar}
		>
			<svg className={styles.MobilePanelToggle_icon} style={css}>
				<use xlinkHref={`${sprite}#icon-menu1`}></use>
			</svg>
		</button>
	);
};

const MobileListsPanel = () => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<aside
			data-mobilecollapsed={isCollapsed}
			className={styles.MobileListsPanel}
		>
			<MobilePanelToggle
				isCollapsed={isCollapsed}
				toggleSidebar={toggleSidebar}
			/>
		</aside>
	);
};

const ListsPanel = ({}: Props) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
	const { width } = useWindowSize();
	const winWidth = width as number;

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	if (winWidth <= 800) {
		return <MobileListsPanel />;
	}
	return (
		<aside data-collapsed={isCollapsed} className={styles.ListsPanel}>
			{/*  */}
			{/*  */}
			<PanelToggle isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
		</aside>
	);
};

export default ListsPanel;

ListsPanel.defaultProps = {};

ListsPanel.propTypes = {};
