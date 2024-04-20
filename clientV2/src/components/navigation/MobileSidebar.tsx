import React from "react";
import styles from "../../css/navigation/MobileSidebar.module.scss";
import sprite from "../../assets/icons/all.svg";
import { NavLink } from "react-router-dom";

type Props = {};

const navItems = [
	{
		label: "Home",
		icon: "dashboard",
		path: "/dashboard",
	},
	{
		label: "Lists",
		icon: "view_list",
		path: "/dashboard/lists",
	},

	{
		label: "Tags",
		icon: "style",
		path: "/dashboard/tags",
	},
	{
		label: "Faves",
		icon: "favorite",
		path: "/dashboard/faves",
	},
	{
		label: "Settings",
		icon: "settings",
		path: "/dashboard/settings",
	},
];

const MobileNavItem = ({ navItem }) => {
	return (
		<li className={styles.MobileNavItem}>
			<NavLink to={navItem.path} className={styles.MobileNavItem_link}>
				<svg className={styles.MobileNavItem_link_icon}>
					<use xlinkHref={`${sprite}#icon-${navItem.icon}`}></use>
				</svg>
			</NavLink>
		</li>
	);
};

const MobileSidebar = ({}: Props) => {
	return (
		<nav className={styles.MobileSidebar}>
			<ul className={styles.MobileSidebar_list}>
				{navItems &&
					navItems.map((navItem, idx) => (
						<MobileNavItem key={`MOBILE-${idx}`} navItem={navItem} />
					))}
			</ul>
		</nav>
	);
};

export default MobileSidebar;

MobileSidebar.defaultProps = {};

MobileSidebar.propTypes = {};
