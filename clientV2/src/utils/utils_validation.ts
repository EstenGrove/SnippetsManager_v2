export interface TFormVals {
	[key: string | number]: unknown;
}
export type TFormKeys = string[] | [];

const isFormReady = (vals: TFormVals, keysToCheck?: TFormKeys) => {
	// if empty array or null is passed as 'keysToCheck', then we check every key in 'vals'
	if (!keysToCheck || keysToCheck?.length <= 0) {
		keysToCheck = Object.keys(vals);
	}

	const tests = keysToCheck.every((key) => {
		const isReady = vals[key] !== "" && vals[key] !== null;
		return isReady;
	});

	return tests;
};

export { isFormReady };
