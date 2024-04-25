import React from "react";
import styles from "../../css/lists/MobileListItem.module.scss";
import { IUserList } from "../../features/lists/types";
import { NavLink } from "react-router-dom";
import { isUncategorized } from "../../utils/utils_lists";
import { addEllipsis } from "../../utils/utils_processing";

type Props = { list: IUserList };

const MobileListItem = ({ list }: Props) => {
	const { listID, listName, isPinned } = list;
	return (
		<div className={styles.MobileListItem}>
			<NavLink to={`${listID}`} className={styles.MobileListItem_link}>
				<div
					className={
						isUncategorized(list)
							? styles.MobileListItem_link_name_uncategorized
							: styles.MobileListItem_link_name
					}
				>
					{addEllipsis(listName, 40)}
				</div>
			</NavLink>
		</div>
	);
};

export default MobileListItem;

MobileListItem.defaultProps = {};

MobileListItem.propTypes = {};
