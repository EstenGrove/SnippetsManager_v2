import React, { useState } from "react";
import styles from "../../css/lists/MobileListsPanel.module.scss";
import sprite from "../../assets/icons/all.svg";
import { IUserList } from "../../features/lists/types";
import { ITag } from "../../features/tags/types";
import MobileListItem from "./MobileListItem";

type Props = {
	userLists: IUserList[] | [];
	userTags: ITag[] | [];
	favesList?: Array<number> | [];
};

type ToggleProps = {
	isCollapsed: boolean;
	toggleSidebar: () => void;
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

const MobileListsPanel = ({ userLists, userTags }: Props) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	return (
		<aside
			data-mobilecollapsed={isCollapsed}
			className={styles.MobileListsPanel}
		>
			<div className={styles.MobileListsPanel_lists}>
				{userLists &&
					userLists.map((list, idx) => (
						<MobileListItem key={idx} list={list} />
					))}
			</div>

			<MobilePanelToggle
				isCollapsed={isCollapsed}
				toggleSidebar={toggleSidebar}
			/>
		</aside>
	);
};

export default MobileListsPanel;

MobileListsPanel.defaultProps = {};

MobileListsPanel.propTypes = {};
