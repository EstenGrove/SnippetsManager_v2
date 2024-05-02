const truncateStr = (str: string | null, maxLength: number = 60): string => {
	if (!str || str === "") return "";
	if (str.length < maxLength) return str;

	return str.slice(0, maxLength);
};

const addEllipsis = (str: string | null, maxLength: number = 60): string => {
	if (!str || str === "") return "";
	if (str.length < maxLength) return str;
	const cutStr = truncateStr(str, maxLength);
	return cutStr + "...";
};

type TMappedList = Record<string, string>;

const groupBy = (key: string, list: Record<string, any>[]) => {
	return list.reduce((acc, item) => {
		const mapKey = item[key];
		if (!acc[mapKey]) {
			acc[mapKey] = [];
		}
		acc[mapKey].push(item);
		return acc;
	}, {} as TMappedList);
};

export { truncateStr, addEllipsis, groupBy };
