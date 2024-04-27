import { useEffect, useCallback, useMemo, useState, ChangeEvent } from "react";
import styles from "../../css/snippets/SnippetsPanel.module.scss";
import { useAppDispatch } from "../../store/store";
import { fetchListSnippets } from "../../features/snippets/operations";
import { selectUserSnippets } from "../../features/snippets/snippetsSlice";
import { ICurrentUser } from "../../features/currentUser/types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IUserList } from "../../features/lists/types";
// components
import PanelList from "../shared/PanelList";
import SnippetsPanelHeading from "./SnippetsPanelHeading";
import SnippetsItem from "./SnippetsItem";
import EmptyData from "../shared/EmptyData";

type Props = {
	currentUser: ICurrentUser;
	userLists: IUserList[];
};

const getCurrentList = (listID: number, userLists: IUserList[]) => {
	if (!listID || listID < 0) return null;
	return userLists.find((list) => list.listID === listID);
};

const SnippetsPanel = ({ userLists, currentUser }: Props) => {
	// const currentList = useSelector(selectCurrentList);
	const { token, userID } = currentUser;
	const dispatch = useAppDispatch();
	const params = useParams();
	const listID: number = Number(params?.["*"]) ?? -1;
	const currentList = useMemo(() => {
		return getCurrentList(listID, userLists);
	}, [listID, userLists]);
	const listSnippets = useSelector(selectUserSnippets);
	const getCurrentListsSnippets = useCallback(() => {
		if (!listID || listID < 0) return;
		const args = {
			token: token as string,
			userID: userID as string,
			listID: listID,
		};
		return dispatch(fetchListSnippets(args));
	}, [dispatch, listID, token, userID]);
	const [searchVal, setSearchVal] = useState<string>("");

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchVal(e.target.value);
	};

	// auto-fetch snippets when listID changes
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (listID > 0) {
			getCurrentListsSnippets();
		}

		return () => {
			isMounted = false;
		};
	}, [getCurrentListsSnippets, listID]);

	if (!currentList) {
		return null;
	}
	return (
		<div className={styles.SnippetsPanel}>
			<SnippetsPanelHeading
				searchVal={searchVal}
				handleSearch={handleSearch}
				numOfSnippets={listSnippets?.length ?? 0}
			/>
			<PanelList key="SNIPPETS">
				{!listSnippets || (listSnippets?.length <= 0 && <EmptyData />)}
				{listSnippets &&
					listSnippets.map((snippet, idx) => (
						<SnippetsItem
							key={`${snippet.snippetID}-${idx}`}
							snippet={snippet}
						/>
					))}
			</PanelList>
		</div>
	);
};

export default SnippetsPanel;

SnippetsPanel.defaultProps = {};

SnippetsPanel.propTypes = {};
