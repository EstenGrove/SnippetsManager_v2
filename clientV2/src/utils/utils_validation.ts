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
		const isReady =
			vals[key] !== "" && vals[key] !== null && vals[key] !== undefined;
		return isReady;
	});

	return tests;
};

export interface TMissingKeys {
	isFormReady: boolean;
	missingKeys: string[];
}

const whichFieldsAreMissing = (
	vals: TFormVals,
	keysToCheck?: TFormKeys
): TMissingKeys => {
	// if empty array or null is passed as 'keysToCheck', then we check every key in 'vals'
	if (!keysToCheck || keysToCheck?.length <= 0) {
		keysToCheck = Object.keys(vals);
	}
	const missingKeys: string[] = [];
	const tests = keysToCheck.every((key) => {
		const isReady =
			vals[key] !== "" && vals[key] !== null && vals[key] !== undefined;
		if (!isReady) {
			missingKeys.push(key);
		}
		return isReady;
	});

	return {
		isFormReady: tests,
		missingKeys: missingKeys,
	};
};

export { isFormReady, whichFieldsAreMissing };
