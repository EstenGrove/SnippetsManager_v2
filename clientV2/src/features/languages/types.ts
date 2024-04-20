/**
 * ILanguage model:
 * @property {String} name - User-facing value for language selection
 * @property {String} alias - Internal 'name' value for the Sandpack <CodeEditor/> component (defines the target language/syntax)
 * @property {String} desc - Internal value for readability (not shown publicly)
 * @property {String} extension - Internal 'ext' value for the Sandpack <CodeEditor/> component (defines the target file's extension)
 */
export interface ILanguage {
	languageID: number;
	name: string;
	alias: string;
	desc: string;
	extension: string;
	isActive: boolean;
	createdDate: string;
	updatedDate: string | null;
	createdBy: string;
	updatedBy: string | null;
}

/**
 * IServerLanguage model:
 * @property {String} Name - User-facing value for language selection
 * @property {String} Alias - Internal 'name' value for the Sandpack <CodeEditor/> component (defines the target language/syntax)
 * @property {String} Desc - Internal value for readability (not shown publicly)
 * @property {String} Extension - Internal 'ext' value for the Sandpack <CodeEditor/> component (defines the target file's extension)
 */

export interface IServerLanguage {
	LanguageID: number;
	Name: string;
	Alias: string;
	Desc: string;
	Extension: string;
	IsActive: boolean;
	CreatedDate: string;
	UpdatedDate: string | null;
	CreatedBy: string;
	UpdatedBy: string | null;
}
