export type TGrouped = {
	[key: string]: unknown;
};

const groupBy = <T extends Record<string, any>, K extends keyof T>(
	key: K,
	list: readonly T[]
): TGrouped => {
	return list.reduce((acc, item) => {
		const mapKey = item?.[key as keyof object];
		if (!acc[mapKey as keyof object]) {
			acc[mapKey as string] = [];
		}
		acc[mapKey].push(item);
		return acc;
	}, {} as Record<string, any>);
};

export { groupBy };
