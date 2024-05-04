import { useEffect } from "react";
import styles from "../../css/snippets/NewSnippet.module.scss";
import { ICurrentUser } from "../../features/currentUser/types";
import { ICurrentList, selectUserLists } from "../../features/lists/listsSlice";
import { useSelector } from "react-redux";
import { selectLangs } from "../../features/languages/langsSlice";
import { useAppDispatch } from "../../store/store";
import { fetchLangs } from "../../features/languages/operations";
// components
import NewSnippetPanel from "./NewSnippetPanel";

type Props = {
	currentUser: ICurrentUser;
	currentList: ICurrentList;
};

const NewSnippet = ({ currentUser, currentList }: Props) => {
	const dispatch = useAppDispatch();
	const userLists = useSelector(selectUserLists);
	const languages = useSelector(selectLangs);

	// if user is loaded, insure the 'languages' are available
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) return;

		if (currentUser?.userID) {
			dispatch(fetchLangs(currentUser?.token as string));
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.NewSnippet}>
			<NewSnippetPanel
				currentList={currentList}
				currentUser={currentUser}
				languages={languages}
				userLists={userLists}
			/>
		</div>
	);
};

export default NewSnippet;

NewSnippet.defaultProps = {};

NewSnippet.propTypes = {};
