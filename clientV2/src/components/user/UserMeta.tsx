import React from "react";
import styles from "../../css/user/UserMeta.module.scss";
import UserBadge from "./UserBadge";
import sprite from "../../assets/icons/all.svg";
import { NavLink } from "react-router-dom";
import { ICurrentUser } from "../../features/currentUser/types";

export type IUserMeta = {
	firstName?: string;
	lastName?: string;
	email?: string;
	username?: string;
};

type Props = {
	user: IUserMeta;
};

const addEllipsis = (str: string, maxLength: number = 40): string => {
	if (!str || str === "") return "";
	if (str.length <= maxLength) return str;
	return str.slice(0, maxLength) + "...";
};

const UserMeta = ({ user }: Props) => {
	return (
		<div className={styles.UserMeta}>
			<UserBadge user={user as ICurrentUser} />
			<div className={styles.UserMeta_info}>
				<div className={styles.UserMeta_info_name}>
					{addEllipsis(user?.username as string, 20)}
				</div>
				<div className={styles.UserMeta_info_email}>
					{addEllipsis(user?.email as string, 18)}
				</div>
			</div>
			<NavLink to="/dashboard/settings">
				<svg className={styles.UserMeta_settings}>
					<use xlinkHref={`${sprite}#icon-settings`}></use>
				</svg>
			</NavLink>
		</div>
	);
};

export default UserMeta;

UserMeta.defaultProps = {};

UserMeta.propTypes = {};
