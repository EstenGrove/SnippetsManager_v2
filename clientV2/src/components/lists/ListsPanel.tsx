import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import styles from "../../css/lists/ListsPanel.module.scss";
import sprite from "../../assets/icons/all.svg";
import { Params, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { useWindowSize } from "../../hooks/useWindowSize";
import { IList, IUserList } from "../../features/lists/types";
import { ITag } from "../../features/tags/types";
import { isFaveList } from "../../utils/utils_faves";
import { ICurrentUser } from "../../features/currentUser/types";
import { ISnippetCounts } from "../../features/dashboard/types";
import { toggleIsPinned } from "../../features/lists/listsSlice";
import { saveNewUserList, sortUserLists } from "../../utils/utils_lists";
// components
import ListsPanelHeading from "./ListsPanelHeading";
import PanelList from "../shared/PanelList";
import ListItem from "./ListItem";
import MobileListsPanel from "./MobileListsPanel";
import NewListDialog from "./NewListDialog";
import { createNewUserList } from "../../features/lists/operations";

type Props = {
	userLists: IUserList[] | [];
	userTags: ITag[] | [];
	favesList?: Array<number> | [];
	currentUser: ICurrentUser;
	snippetCounts: ISnippetCounts;
};

type ToggleProps = {
	isCollapsed: boolean;
	toggleSidebar: () => void;
};

const searchList = (val: string, list: IUserList[]) => {
	if (!val || list?.length <= 0) return [];
	const searchVal: string = val?.toLowerCase();

	return list.filter((entry: IUserList) => {
		const entryVal: string = entry?.listName?.toLowerCase();
		const hasMatch: boolean =
			entryVal.includes(searchVal) || entryVal.startsWith(searchVal);
		return hasMatch;
	});
};

const getCountFromData = (listID: number, counts: ISnippetCounts) => {
	const entry = counts?.[listID];
	if (entry) {
		return entry?.count ?? 0;
	} else {
		return 0;
	}
};

// we have to do this, since we're using <SnippetsPanel/> as a child route index, not a direct descendant route
const getListIDFromParams = (params: Readonly<Params<string>>): number => {
	const target = params?.["*"];
	const separated = target?.split("/");
	const listID = separated?.[0];
	return Number(listID);
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

const ListsPanel = ({
	userLists,
	userTags,
	favesList,
	currentUser,
	snippetCounts,
}: Props) => {
	const dispatch = useAppDispatch();

	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
	const { width } = useWindowSize();
	const winWidth = width as number;
	const params = useParams();
	const listID = getListIDFromParams(params);
	// const listID: number = Number(params?.["*"]) ?? -1;
	// Create new list states
	const [newList, setNewList] = useState<string>("");
	const [showNewListDialog, setShowNewListDialog] = useState<boolean>(false);
	// list states
	const [searchVal, setSearchVal] = useState<string>("");
	const visibleLists: IUserList[] = useMemo(() => {
		if (!searchVal || searchVal === "") {
			// sort by 'isPinned'
			// return sortBoolAscByKey("isPinned", userLists) as IUserList[];
			return sortUserLists(userLists) as IUserList[];
		}
		// if 'searchVal' is not empty, we're 'searching'
		return searchList(searchVal, userLists) as IUserList[];
	}, [searchVal, userLists]);

	const toggleSidebar = () => {
		setIsCollapsed(!isCollapsed);
	};

	const handleIsPinned = (listID: number) => {
		console.log(`Mark as Pinned: `, listID);
		const isCurrentlyPinned = visibleLists.find(
			(list) => list.listID === listID
		)?.isPinned;
		const shouldPin = !isCurrentlyPinned;
		dispatch(
			toggleIsPinned({
				isPinned: shouldPin,
				listID: listID,
			})
		);
	};
	const handleIsFave = (listID: number) => {
		console.log(`Mark as Favorite: `, listID);
	};
	const handleListSearch = (e: ChangeEvent<HTMLInputElement>) => {
		console.log("e", e);
		setSearchVal(e.target.value as string);
	};
	const handleNewList = (e: ChangeEvent<HTMLInputElement>) => {
		setNewList(e.target.value);
	};

	const openNewListDialog = () => {
		setShowNewListDialog(true);
	};
	const closeNewListDialog = () => {
		setShowNewListDialog(false);
	};
	const saveNewList = async (e: FormEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const { userID, token } = currentUser;
		const newListItem = {
			// listID: Math.max(...ids) + 1,
			listID: 0,
			userListID: 0,
			userID: userID,
			listName: newList,
			listDesc: `Desc: ${newList}`,
			isPinned: false,
			createdDate: new Date().toISOString(),
			updatedDate: null,
			createdBy: userID,
			updatedBy: null,
			isActive: true,
		};

		dispatch(
			createNewUserList({
				token: token as string,
				userID: userID as string,
				newList: newListItem as IList,
			})
		);
		closeNewListDialog();
	};

	if (winWidth <= 800) {
		return <MobileListsPanel userLists={visibleLists} userTags={userTags} />;
	}
	return (
		<aside
			data-name="listsPanel"
			data-collapsed={isCollapsed}
			className={styles.ListsPanel}
		>
			<ListsPanelHeading
				searchVal={searchVal}
				handleSearch={handleListSearch}
				numOfLists={userLists?.length ?? 0}
				openNewListDialog={openNewListDialog}
			/>
			<PanelList key="Lists">
				{visibleLists &&
					visibleLists.map((list, idx) => (
						<ListItem
							key={`LIST-${list.listID}--${idx}`}
							list={list}
							isFave={isFaveList(list.listID, favesList as Array<number>)}
							isSelected={Number(listID) === list.listID}
							toggleIsPinned={() => handleIsPinned(list.listID)}
							toggleIsFave={() => handleIsFave(list.listID)}
							snippetCount={getCountFromData(list.listID, snippetCounts)}
						/>
					))}
			</PanelList>
			<PanelToggle isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
			{showNewListDialog && (
				<NewListDialog
					newListVal={newList}
					handleNewList={handleNewList}
					saveNewList={saveNewList}
					closeDialog={closeNewListDialog}
				/>
			)}
		</aside>
	);
};

export default ListsPanel;

ListsPanel.defaultProps = {};

ListsPanel.propTypes = {};
