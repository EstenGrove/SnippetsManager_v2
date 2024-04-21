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

export { truncateStr, addEllipsis };
