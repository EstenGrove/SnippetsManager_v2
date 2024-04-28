import { useEffect, useCallback, useMemo, useState, ChangeEvent } from "react";
import styles from "../../css/snippets/SnippetsPanel.module.scss";
import { useAppDispatch } from "../../store/store";
import { Route, Routes, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchListSnippets } from "../../features/snippets/operations";
import { selectUserSnippets } from "../../features/snippets/snippetsSlice";
import { ICurrentUser } from "../../features/currentUser/types";
import { IUserList } from "../../features/lists/types";
import { ISnippetCounts } from "../../features/dashboard/types";
// components
import DashboardNav from "../dashboard/DashboardNav";
import SnippetsContentPanel from "./SnippetsContentPanel";

type Props = {
	currentUser: ICurrentUser;
	userLists: IUserList[];
	snippetCounts: ISnippetCounts;
};

const getCurrentList = (listID: number, userLists: IUserList[]) => {
	if (!listID || listID < 0) return null;
	return userLists.find((list) => list.listID === listID);
};

const SnippetsPanel = ({ userLists, currentUser, snippetCounts }: Props) => {
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
			{/* <DashboardNav /> */}
			<Routes>
				<Route
					path="*"
					element={
						<SnippetsContentPanel
							currentList={currentList}
							currentUser={currentUser}
							snippetCounts={snippetCounts}
							snippets={listSnippets}
						/>
					}
				/>
			</Routes>

			{/*  */}
			{/*  */}
		</div>
	);
};

export default SnippetsPanel;

SnippetsPanel.defaultProps = {};

SnippetsPanel.propTypes = {};
