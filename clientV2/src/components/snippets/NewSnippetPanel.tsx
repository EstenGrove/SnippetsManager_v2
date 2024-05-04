import React, { ChangeEvent, useRef, useState } from "react";
import styles from "../../css/snippets/NewSnippetPanel.module.scss";
import NewSnippetHeading from "./NewSnippetHeading";
import EditorPanel from "../editor/EditorPanel";
import { ICurrentUser } from "../../features/currentUser/types";
import { ICurrentList } from "../../features/lists/listsSlice";
import { saveNewSnippet } from "../../utils/utils_snippets";
import { ISnippet } from "../../features/snippets/types";
import { getLangIDFromName } from "../../utils/utils_langs";
import { ILanguage } from "../../features/languages/types";
import {
	isFormReady,
	whichFieldsAreMissing,
} from "../../utils/utils_validation";
import { IUserList } from "../../features/lists/types";

type Props = {
	currentUser: ICurrentUser;
	currentList: ICurrentList;
	languages: ILanguage[];
	userLists: IUserList[];
};

const NEW_SNIPPET = {
	snippetID: 0,
	languageID: 0,
	snippetName: "",
	snippetDesc: "",
	snippetCode: "",
	snippetOrigin: "",
	isFave: false,
	isActive: true,
	createdDate: new Date().toISOString(),
	updatedDate: null,
	createdBy: null,
	updatedBy: null,
};

// REQUIREMENTS:
// - TITLE
// - LANGUAGE (ID)
// - ORIGIN (EG. URL)
// - CODE (EG. SNIPPET)

export interface INewSnippet {
	title: string;
	origin: string;
}

const NewSnippetPanel = ({
	currentUser,
	currentList,
	languages,
	userLists,
}: Props) => {
	const editorRef = useRef<HTMLTextAreaElement>(null);
	const [snippetValues, setSnippetValues] = useState<INewSnippet>({
		title: "New Snippet",
		origin: "",
	});
	const [lang, setLang] = useState<string>("tsx");
	const [listName, setListName] = useState<string>(currentList.list.listName);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		console.log("e", e);
		setSnippetValues({
			...snippetValues,
			[name]: value,
		});
	};

	const handleList = (list: string) => {
		setListName(list);
	};

	const handleLang = (lang: string) => {
		setLang(lang);
	};

	const createSnippet = async () => {
		const { userID, token } = currentUser;
		const code = editorRef?.current?.value;
		const langID = getLangIDFromName(lang, languages);

		const newSnippet = {
			snippetID: 0,
			snippetName: snippetValues?.title,
			snippetDesc: `Desc: ${snippetValues?.title}`,
			snippetCode: code,
			languageID: langID,
			snippetOrigin: snippetValues?.origin,
			isFave: false,
			isActive: true,
			createdDate: new Date().toUTCString(),
			updatedDate: null,
			createdBy: userID,
			updatedBy: null,
		};

		const results = whichFieldsAreMissing(newSnippet, [
			"snippetName",
			"snippetCode",
			"languageID",
			"createdBy",
			"createdDate",
		]);
		const { isFormReady: isReady, missingKeys } = results;
		console.log("isReady", isReady);
		console.log("newSnippet", newSnippet);
		if (!isReady)
			return alert(`❌ Whoops! Missing keys: ${JSON.stringify(missingKeys)}`);

		// const wasSaved = await saveNewSnippet(
		// 	token as string,
		// 	newSnippet as ISnippet
		// );
	};

	return (
		<div className={styles.NewSnippetPanel}>
			<h1 style={{ color: "white", paddingLeft: "2rem" }}>
				{snippetValues?.title}
			</h1>
			<NewSnippetHeading
				title={snippetValues.title}
				origin={snippetValues.origin}
				handleTitle={handleChange}
				saveSnippet={createSnippet}
			/>

			<EditorPanel
				editorRef={editorRef}
				handleLang={handleLang}
				currentListName={listName}
				handleList={handleList}
				userLists={userLists}
			/>
			{/*  */}
			{/*  */}
		</div>
	);
};

export default NewSnippetPanel;

NewSnippetPanel.defaultProps = {};

NewSnippetPanel.propTypes = {};
