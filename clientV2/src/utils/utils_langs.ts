import { fetchWithAuth } from "./utils_auth";
import { currentEnv, langs } from "./utils_env";

const fetchAllLanguages = async () => {
	const url = currentEnv.base + langs.getAll;

	try {
		const req = await fetchWithAuth(url);
		const res = await req.json();
		return res;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const langRecords = [
	{
		LanguageID: 1,
		Name: "HTML",
		Alias: "HTML (.html) Syntax",
		CreatedDate: "2024-02-24T23:02:34.783Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 2,
		Name: "CSS",
		Alias: "CSS (.css) Syntax",
		CreatedDate: "2024-02-24T23:02:49.266Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 3,
		Name: "SCSS",
		Alias: "SCSS (.scss) Syntax",
		CreatedDate: "2024-02-24T23:03:02.185Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 4,
		Name: "JS",
		Alias: "Javascript (.js) Syntax",
		CreatedDate: "2024-02-24T23:03:14.860Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 5,
		Name: "JSX",
		Alias: "React JSX (.jsx) Syntax",
		CreatedDate: "2024-02-24T23:03:30.449Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 6,
		Name: "TSX",
		Alias: "React TSX (.tsx) Syntax",
		CreatedDate: "2024-02-24T23:03:41.434Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 7,
		Name: "TS",
		Alias: "Typescript (.ts) Syntax",
		CreatedDate: "2024-02-24T23:03:55.241Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 8,
		Name: "SQL",
		Alias: "SQL (.sql) Syntax",
		CreatedDate: "2024-02-24T23:05:15.643Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 9,
		Name: "Markdown",
		Alias: "Markdown (.md) Syntax",
		CreatedDate: "2024-02-24T23:05:31.208Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 10,
		Name: "JSON",
		Alias: "JSON (.json) Syntax",
		CreatedDate: "2024-02-24T23:05:54.329Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 11,
		Name: "Bash",
		Alias: "Bash (.sh) Syntax",
		CreatedDate: "2024-02-24T23:06:53.409Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 12,
		Name: "Powershell",
		Alias: "Powershell (.ps1) Syntax",
		CreatedDate: "2024-02-24T23:07:23.497Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 13,
		Name: "Text",
		Alias: "Plain Text (.txt) Syntax",
		CreatedDate: "2024-02-24T23:07:52.136Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
	{
		LanguageID: 14,
		Name: "Rich Text",
		Alias: "Rich Text (.rtf) Syntax",
		CreatedDate: "2024-02-24T23:09:08.705Z",
		UpdatedDate: null,
		CreatedBy: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
		UpdatedBy: null,
		IsActive: true,
	},
];

export { fetchAllLanguages };
