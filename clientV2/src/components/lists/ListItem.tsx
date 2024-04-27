import styles from "../../css/lists/ListItem.module.scss";
import pins from "../../assets/icons/pins2.svg";
import { NavLink } from "react-router-dom";
import { IUserList } from "../../features/lists/types";
import { addEllipsis } from "../../utils/utils_processing";
import { isUncategorized } from "../../utils/utils_lists";

type Props = {
	list: IUserList;
	isFave: boolean;
	isSelected: boolean;
	snippetCount: number;
	toggleIsPinned: () => void;
	toggleIsFave: () => void;
};

// PinIcon props
type PinProps = {
	togglePin: () => void;
	isPinned: boolean;
};

const PinIcon = ({ togglePin, isPinned }: PinProps) => {
	return (
		<div data-name="pin" className={styles.PinIcon} onClick={togglePin}>
			<svg
				className={
					isPinned
						? `${styles.PinIcon_icon} ${styles.pinned}`
						: styles.PinIcon_icon
				}
			>
				<use xlinkHref={`${pins}#icon-${isPinned ? "pin-6" : "pin-6"}`}></use>
			</svg>
		</div>
	);
};

type SnippetCount = {
	snippetCount: number;
};
const SnippetCount = ({ snippetCount }: SnippetCount) => {
	return (
		<div className={styles.SnippetCount}>
			<div className={styles.SnippetCount_value}>{snippetCount}</div>
		</div>
	);
};

const ListItem = ({
	list,
	isSelected = false,
	toggleIsPinned,
	snippetCount = 0,
}: Props) => {
	const { listID, listName, isPinned } = list;

	return (
		<div
			data-list={list?.listID}
			className={
				isSelected ? `${styles.ListItem} ${styles.isSelected}` : styles.ListItem
			}
		>
			<PinIcon togglePin={toggleIsPinned} isPinned={isPinned} />
			<NavLink to={`${listID}`} className={styles.ListItem_link}>
				<div
					className={
						isUncategorized(list)
							? styles.ListItem_link_name_uncategorized
							: styles.ListItem_link_name
					}
				>
					{/* {addEllipsis(listName, 25)} */}
					{addEllipsis(listName, 20)}
				</div>
			</NavLink>
			<SnippetCount snippetCount={snippetCount} />
		</div>
	);
};

export default ListItem;

ListItem.defaultProps = {};

ListItem.propTypes = {};
