import React, {
	useEffect,
	ChangeEvent,
	ChangeEventHandler,
	useCallback,
	useState,
	useMemo,
} from "react";
import styles from "../../css/dashboard/DashboardSearch.module.scss";
import TextInput from "../shared/TextInput";
import InputResults from "../shared/InputResults";
import Button from "../shared/Button";

type Props = {};

const validations = {
	numbers: /(?=.*\d){1,}/gm,
	lowers: /(?=.*[a-z]){1,}/gm,
	uppers: /((?=.*[A-Z]){1,})/gm,
	specials: /(.*[A-Z!@#$%^&()_+\-=[\]{}*|;:<>?,./]){1,}/gm,
	minLength: /(?=.*\S{8,})/gm,
};

const errorMap = {
	numbers: "At least one number is required",
	lowers: "At least one lower-case letter is required",
	uppers: "At least one upper-case letter is required",
	specials:
		"At least one special character is required (eg. ~,!,@,#,$,%,^,&,*,(,),-,_,+,=) ",
	minLength: "Passwords must be at least 8 characters long",
};

const charTypes = {
	lowercase: "abcdefghijklmnopqrstuvwxyz",
	uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	number: "0123456789",
	symbol: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
};

interface IConfig {
	numbers: number;
	lowers: number;
	uppers: number;
	specials: number;
	minLength: number;
}

const getRandomIndex = (length: number): number => {
	return Math.floor(Math.random() * length);
};

const enforceRequirements = (pwd: string): string => {
	let newPwd = pwd;

	const hasNums = validations.numbers.test(pwd);
	const hasLowers = validations.lowers.test(pwd);
	const hasUppers = validations.uppers.test(pwd);
	const hasSpecs = validations.specials.test(pwd);

	if (!hasNums) {
		newPwd += charTypes.number[getRandomIndex(charTypes.number.length)];
	}
	if (!hasLowers) {
		newPwd += charTypes.lowercase[getRandomIndex(charTypes.lowercase.length)];
	}
	if (!hasUppers) {
		newPwd += charTypes.uppercase[getRandomIndex(charTypes.uppercase.length)];
	}
	if (!hasSpecs) {
		newPwd += charTypes.symbol[getRandomIndex(charTypes.symbol.length)];
	}

	return newPwd;
};

const generatePassword = (minLength: number = 8): string => {
	const charTypes = {
		lowercase: "abcdefghijklmnopqrstuvwxyz",
		uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		number: "0123456789",
		symbol: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
	};
	const chars: string = Object.values(charTypes).join("");
	let password: string = "";

	for (let i = 0; i < minLength; i++) {
		password += chars[Math.floor(Math.random() * chars.length)];
	}

	const fixedPassword = enforceRequirements(password);

	return fixedPassword;
};

// generates regex from length/numbers config
const getValidatorsFromConfig = (config: IConfig) => {
	const { numbers, lowers, uppers, specials, minLength } = config;
	const nums = new RegExp(`(?=.*\d){${numbers},}`);
	const lower = new RegExp(`(?=.*[a-z]){${lowers},}`);
	const upper = new RegExp(`(?=.*[a-z]){${uppers},}`);
	const special = new RegExp(`(?=.*[a-z]){${specials},}`);
	const minChars = new RegExp(`(?=.*[a-z]){${minLength},}`);

	return {
		numbers: nums,
		lowers: lower,
		uppers: upper,
		specials: special,
		minLength: minChars,
	};
};
const getErrorsFromConfig = (config: IConfig) => {
	const { numbers, lowers, uppers, specials, minLength } = config;

	return {
		numbers: `At least ${numbers} number(s) is required`,
		lowers: `At least ${lowers} lower-case letter(s) is required`,
		uppers: `At least ${uppers} upper-case letter(s) is required`,
		specials: `At least ${specials} special character(s) is required (eg. ~,!,@,#,$,%,^,&,*,(,),-,_,+,=)`,
		minLength: `Passwords must be at least ${minLength} characters long`,
	};
};

const pwdReg =
	/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*()-_+=]).{6,20}/gim;

export interface IValidator {
	isValid: boolean;
	issues: string[];
}

const validatePassword = (password: string): IValidator => {
	const keys = Object.keys(validations);
	const issues: string[] = [];
	for (let i = 0; i < keys.length; i++) {
		const curKey = keys[i];
		const regex = new RegExp(validations[curKey as keyof object]) as RegExp;
		const isValid = regex.test(password);
		if (!isValid) {
			const error = errorMap[curKey as keyof object];
			issues.push(error);
		}
	}
	return {
		isValid: issues?.length <= 0 && !!password,
		issues: issues,
	};
};

const generateAndValidateMany = (count = 100) => {
	const results = [];
	for (let i = 0; i < count; i++) {
		const pwd = generatePassword();
		const validation = validatePassword(pwd);
		results.push({
			password: pwd,
			isValid: validation?.isValid,
			errors: validation?.issues,
		});
	}

	return results;
};

const readResults = (results = []) => {};

const DashboardSearch = () => {
	const [passwords, setPasswords] = useState({
		password: "",
		confirmPassword: "",
	});
	const [generatedPwd, setGeneratedPwd] = useState<string>("");

	const results = useMemo(() => {
		const { password } = passwords;
		return validatePassword(password);
	}, [passwords]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPasswords({
			...passwords,
			[name]: value,
		});
	};

	const createPassword = () => {
		const minLength = 12;
		const pwd = generatePassword(minLength);
		setGeneratedPwd(pwd);
	};

	console.log("RESULTS:\n\n", generateAndValidateMany());

	return (
		<div className={styles.DashboardSearch}>
			<h2>Search</h2>
			<div className={styles.DashboardSearch_main}>
				<TextInput
					label="Password"
					name="password"
					id="password"
					val={passwords.password}
					handleChange={handleChange as ChangeEventHandler}
					isInvalid={!results?.isValid}
				/>
			</div>
			<div className={styles.DashboardSearch_main}>
				<InputResults isValid={results?.isValid} issues={results?.issues} />
			</div>
			<div className={styles.DashboardSearch_main}>
				<Button handleClick={createPassword} styles={{ margin: "2rem 0" }}>
					Generate Password
				</Button>
				<div>{generatedPwd}</div>
			</div>
		</div>
	);
};

export default DashboardSearch;

DashboardSearch.defaultProps = {};

DashboardSearch.propTypes = {};
