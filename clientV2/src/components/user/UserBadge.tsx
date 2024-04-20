import styles from "../../css/user/UserBadge.module.scss";
import { ICurrentUser } from "../../features/currentUser/types";

type Props = {
	user: ICurrentUser;
};

const getUserInitials = (user: ICurrentUser) => {
	const { username } = user;
	const first = username?.slice(0, 1);
	return first?.repeat(2);
};

const UserBadge = ({ user }: Props) => {
	const initials = getUserInitials(user);
	return (
		<div className={styles.UserBadge}>
			<div className={styles.UserBadge_inner}>
				<div className={styles.UserBadge_inner_initials}>{initials}</div>
			</div>
		</div>
	);
};

export default UserBadge;

UserBadge.defaultProps = {};

UserBadge.propTypes = {};
