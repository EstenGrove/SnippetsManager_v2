import { ChangeEvent, ChangeEventHandler, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../../css/navigation/Sidebar.module.scss";
import sprite from "../../assets/icons/all.svg";
import { useWindowSize } from "../../hooks/useWindowSize";
import UserBadge from "../user/UserBadge";
import UserMeta from "../user/UserMeta";
import Selector from "../shared/Selector";
import MobileSidebar from "./MobileSidebar";
import ToggleSwitch from "../shared/ToggleSwitch";
import { ThemeContext } from "../../context/ThemeContext";
import { ICurrentUser } from "../../features/currentUser/types";

type Props = {
	currentUser: ICurrentUser;
};

const MOCK_USER = {
	firstName: "Esten",
	lastName: "Grove",
	email: "estengrove99@gmail.com",
};

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
		label: "Search",
		icon: "search",
		path: "/dashboard/search",
	},
];

type NavItemProps = {
	isCollapsed: boolean;
	navItem: {
		label: string;
		icon: string;
		path: string;
	};
};
const SidebarNavItem = ({ isCollapsed = false, navItem }: NavItemProps) => {
	if (isCollapsed) {
		return (
			<li className={styles.SidebarNavItemCollapsed}>
				<NavLink
					to={navItem.path}
					className={styles.SidebarNavItemCollapsed_link}
				>
					<svg className={styles.SidebarNavItemCollapsed_link_icon}>
						<use xlinkHref={`${sprite}#icon-${navItem.icon}`}></use>
					</svg>
					<span className={styles.SidebarNavItemCollapsed_link_label}>
						{navItem.label}
					</span>
				</NavLink>
			</li>
		);
	}
	return (
		<li className={styles.SidebarNavItem}>
			<NavLink to={navItem.path} className={styles.SidebarNavItem_link}>
				<svg className={styles.SidebarNavItem_link_icon}>
					<use xlinkHref={`${sprite}#icon-${navItem.icon}`}></use>
				</svg>
				<span className={styles.SidebarNavItem_link_label}>
					{navItem.label}
				</span>
			</NavLink>
		</li>
	);
};

type ToggleProps = {
	isCollapsed: boolean;
	toggleSidebar: () => void;
};
const SidebarToggle = ({ toggleSidebar, isCollapsed = false }: ToggleProps) => {
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
			className={styles.SidebarToggle}
			onClick={toggleSidebar}
		>
			<svg className={styles.SidebarToggle_icon} style={css}>
				<use xlinkHref={`${sprite}#icon-keyboard_arrow_right`}></use>
			</svg>
		</button>
	);
};

const WorkspaceButton = ({ isDisabled = false }) => {
	return (
		<button
			type="button"
			disabled={isDisabled}
			className={styles.WorkspaceButton}
		>
			<svg className={styles.WorkspaceButton_icon}>
				<use xlinkHref={`${sprite}#icon-multiple_stop`}></use>
			</svg>
		</button>
	);
};

const WORKSPACES = ["Eldermark", "ALA", "Personal"];

const Sidebar = ({ currentUser }: Props) => {
	const { width } = useWindowSize();
	const winWidth = width as number;
	const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
	const { theme, toggleTheme } = useContext(ThemeContext);
	const [isDark, setIsDark] = useState(theme === "dark");

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	const handleTheme = (e: ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		setIsDark(isChecked);
		toggleTheme();
	};

	console.log("currentUser", currentUser);

	if (winWidth <= 800) {
		return <MobileSidebar />;
	}
	return (
		<aside data-collapsed={isCollapsed} className={styles.Sidebar}>
			<div className={styles.Sidebar_header}>
				{!isCollapsed && (
					<div className={styles.Sidebar_header_row}>
						<ToggleSwitch
							name="theme"
							id="theme"
							val={isDark}
							handleCheckbox={handleTheme as ChangeEventHandler}
						/>
						<div className={styles.Sidebar_header_row_label}>Dark Mode</div>
					</div>
				)}
			</div>
			<nav className={styles.Sidebar_nav}>
				<ul className={styles.Sidebar_nav_list}>
					{navItems &&
						navItems.map((navItem, idx) => (
							<SidebarNavItem
								key={idx}
								isCollapsed={isCollapsed}
								navItem={navItem}
							/>
						))}
				</ul>
			</nav>
			<div className={styles.Sidebar_footer}>
				<div className={styles.Sidebar_footer_row}>
					<WorkspaceButton />
					{!isCollapsed && (
						<Selector placeholder="Select workspace" options={WORKSPACES} />
					)}
				</div>
				<div data-user="meta" className={styles.Sidebar_footer_row}>
					{!isCollapsed && <UserMeta user={currentUser} />}

					{isCollapsed && <UserBadge user={currentUser} />}
				</div>
			</div>

			<SidebarToggle isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
		</aside>
	);
};

export default Sidebar;

Sidebar.defaultProps = {};

Sidebar.propTypes = {};
