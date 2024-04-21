const isFaveList = (listID: number, faveLists: Array<number>): boolean => {
	if (!faveLists || faveLists?.length <= 0) return false;
	return faveLists.includes(listID);
};
const isFaveTag = (tagID: number, faveTags: Array<number>): boolean => {
	if (!faveTags || faveTags?.length <= 0) return false;
	return faveTags.includes(tagID);
};
const isFaveSnippet = (
	snippetID: number,
	faveSnippets: Array<number>
): boolean => {
	if (!faveSnippets || faveSnippets?.length <= 0) return false;
	return faveSnippets.includes(snippetID);
};

export { isFaveList, isFaveTag, isFaveSnippet };
