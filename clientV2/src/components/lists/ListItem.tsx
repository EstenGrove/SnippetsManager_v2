import React, { ReactNode } from "react";
import styles from "../../css/lists/ListItem.module.scss";
import pins from "../../assets/icons/pins.svg";
import sprite from "../../assets/icons/all.svg";
import { NavLink } from "react-router-dom";
import { IUserList } from "../../features/lists/types";
import { addEllipsis } from "../../utils/utils_processing";

type Props = {
	list: IUserList;
	isFave: boolean;
	isSelected: boolean;
	toggleIsPinned: () => void;
	toggleIsFave: () => void;
};

const isUncategorized = (list: IUserList): boolean => {
	const { listID, listName } = list;
	const isMatch = listID === 13 && listName === "Un-Categorized";
	return isMatch;
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
				<use xlinkHref={`${pins}#icon-pin`}></use>
			</svg>
		</div>
	);
};

type FaveProps = {
	isFave: boolean;
	toggleFave: () => void;
};
const FaveIcon = ({ toggleFave, isFave = false }: FaveProps) => {
	return (
		<div data-name="fave" className={styles.FaveIcon} onClick={toggleFave}>
			<svg
				className={
					isFave
						? `${styles.FaveIcon_icon} ${styles.faved}`
						: styles.FaveIcon_icon
				}
			>
				<use
					xlinkHref={`${sprite}#icon-${isFave ? "star" : "star_outline"}`}
				></use>
			</svg>
		</div>
	);
};

type SnippetCount = {
	snippetCount: number;
};
const SnippetCount = ({ snippetCount }: SnippetCount) => {
	return <div className={styles.SnippetCount}>({snippetCount})</div>;
};

type Actions = {
	children?: ReactNode;
};
const Actions = ({ children }: Actions) => {
	return <div className={styles.Actions}>{children}</div>;
};

const ListItem = ({
	list,
	isFave = false,
	isSelected = false,
	toggleIsPinned,
	toggleIsFave,
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
					{addEllipsis(listName, 25)}
				</div>
			</NavLink>
			<SnippetCount snippetCount={22} />
			{false && (
				<Actions>
					{/* <EditButton /> */}
					<FaveIcon isFave={isFave} toggleFave={toggleIsFave} />
				</Actions>
			)}
		</div>
	);
};

export default ListItem;

ListItem.defaultProps = {};

ListItem.propTypes = {};
