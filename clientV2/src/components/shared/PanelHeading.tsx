import React, { ReactNode } from "react";
import styles from "../../css/shared/PanelHeading.module.scss";
// import sprite from "../../assets/icons/general.svg";
import sprite from "../../assets/icons/all.svg";

type Props = {
	title?: string;
	itemsCount?: number;
	children?: ReactNode;
};

type PanelIcons = {
	Tags: "tags";
	Lists: "view_list";
	Snippets?: string;
	Recent?: string;
	Favorites?: string;
	Settings?: string;
};

const icons: PanelIcons = {
	Tags: "tags",
	Snippets: "code2",
	Lists: "view_list",
	Recent: "recent_actors",
	Favorites: "star_outline1",
	Settings: "settings",
};

const PanelHeading = ({ title, itemsCount }: Props) => {
	return (
		<div className={styles.PanelHeading}>
			<div className={styles.PanelHeading_titleWrapper}>
				<svg className={styles.PanelHeading_titleWrapper_icon}>
					<use
						xlinkHref={`${sprite}#icon-${icons[title as keyof PanelIcons]}`}
					></use>
				</svg>
				<h4 className={styles.PanelHeading_titleWrapper_title}>
					{title} <span>({itemsCount})</span>
				</h4>
			</div>
		</div>
	);
};

export default PanelHeading;

PanelHeading.defaultProps = {};

PanelHeading.propTypes = {};
