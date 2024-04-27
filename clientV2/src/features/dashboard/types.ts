export type TListID = number;

export type TSnippetCounts = {
	[key: TListID]: {
		ListID: TListID;
		Count: number;
	};
};

export interface ISnippetCounts {
	[key: TListID]: {
		listID: TListID;
		count: number;
	};
}
