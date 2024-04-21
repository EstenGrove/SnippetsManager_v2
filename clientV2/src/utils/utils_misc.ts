type TList = Array<T>;

const updateAt = (list: TList, index: number, updatedItem: T) => {
	return [...list.map((curItem, i) => (i === index ? updatedItem : curItem))];
};

// inserts a new item at a specific index
const insertAt = (list: TList, index: number, itemToInsert: T) => {
	return [...list.slice(0, index), itemToInsert, ...list.slice(index)];
};

// removes an item an a specific index
const removeAt = (list: TList, index: number) => {
	return [...list.slice(0, index), ...list.slice(index + 1)];
};

/**
 * Sorts an array alphabetically (non-objects).
 */

// sorts string alphabetically (A-Z)
const sortByAlphaAsc = (list: string[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		return a?.localeCompare(b);
	});
};
// sorts string alphabetically (Z-A)
const sortByAlphaDesc = (list: string[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		return b?.localeCompare(a);
	});
};
// returns 'true' values first (ie. [true, true, false, false, null] )
const sortByBoolAsc = (list: boolean[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		return Number(a) - Number(b);
		// return a === b ? 0 : a ? -1 : 1;
	});
};
// returns 'false' values first (ie. [null, null, false, false, true] )
const sortByBoolDesc = (list: boolean[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		return Number(b) - Number(a);
		// return a === b ? 0 : a ? 1 : -1;
	});
};
// sorts number ascending order (1-10)
const sortByNumAsc = (list: number[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a: number, b: number) => {
		return a - b;
	});
};
// sorts number descending order (10-1)
const sortByNumDesc = (list: number[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		const numA: number = a;
		const numB: number = b;

		return numB - numA;
	});
};
// sorts date ascending order (10-1)
const sortByDateAsc = (list: string[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		const dateA = new Date(a).getUTCDate();
		const dateB = new Date(b).getUTCDate();
		return dateA - dateB;
	});
};
// sorts date descending order (10-1)
const sortByDateDesc = (list: string[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		const dateA = new Date(a).getUTCDate();
		const dateB = new Date(b).getUTCDate();

		return dateB - dateA;
	});
};

/**
 * Sorts an array alphabetically by object property (key).
 * - Key value MUST be a <String>
 */

// sorts alphabetically (ascending order) by key
const sortAlphaAscByKey = (key: string, list: object[] = []) => {
	if (!list || list.length <= 0) return [];
	return list.sort((a, b) => {
		const sortKey = `${key}` as keyof object;
		// @ts-expect-error
		return a?.[sortKey].localeCompare(b?.[sortKey]);
	});
};

// sorts alphabetically (descending order) by key
const sortAlphaDescByKey = (key: string, list: object[] = []) => {
	return list.sort((a: object, b: object) => {
		const sortKey = `${key}` as keyof object;
		// @ts-expect-error
		return b?.[sortKey]?.localeCompare(a?.[sortKey]);
	});
};

// returns 'true' values first
const sortBoolAscByKey = (key: string, list: object[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		const sortKey = `${key}` as keyof object;
		return a?.[sortKey] === b?.[sortKey] ? 0 : a?.[sortKey] ? -1 : 1;
	});
};

// returns 'false' values first
const sortBoolDescByKey = (key: string, list: object[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		const sortKey = `${key}` as keyof object;
		return a?.[sortKey] === b?.[sortKey] ? 0 : a?.[sortKey] ? 1 : -1;
	});
};

// sorts number ascending order (1-10)
const sortNumAscByKey = (key: string, list: object[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		const sortKey = `${key}` as keyof object;
		return a?.[sortKey] - b?.[sortKey];
	});
};
// sorts number descending order (10-1)
const sortNumDescByKey = (key: string, list: object[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		const sortKey = `${key}` as keyof object;
		return b?.[sortKey] - a?.[sortKey];
	});
};

// sorts date ascending order (10-1)
const sortDateAscByKey = (key: string, list: object[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		const sortKey = `${key}` as keyof object;
		const aVal = a?.[sortKey];
		const bVal = b?.[sortKey];
		return new Date(aVal).getTime() - new Date(bVal).getTime();
	});
};
// sorts date descending order (10-1)
const sortDateDescByKey = (key: string, list: object[] = []) => {
	if (!list || list.length <= 0) return [];
	return [...list].sort((a, b) => {
		const sortKey = `${key}` as keyof object;
		const aVal = a?.[sortKey];
		const bVal = b?.[sortKey];
		return new Date(bVal).getTime() - new Date(aVal).getTime();
	});
};

export { updateAt, insertAt, removeAt };

export {
	// non-object arrays (primitives)
	// - string[]
	// - number[]
	// - boolean[]
	// - date[]
	sortByAlphaAsc,
	sortByAlphaDesc,
	sortByNumAsc,
	sortByNumDesc,
	sortByBoolAsc,
	sortByBoolDesc,
	sortByDateAsc,
	sortByDateDesc,
	// array of objects
	sortAlphaAscByKey,
	sortAlphaDescByKey,
	sortNumAscByKey,
	sortNumDescByKey,
	sortBoolAscByKey,
	sortBoolDescByKey,
	sortDateAscByKey,
	sortDateDescByKey,
};
