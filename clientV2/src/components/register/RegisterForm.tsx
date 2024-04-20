import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import styles from "../../css/register/RegisterForm.module.scss";
import { NavLink } from "react-router-dom";
import { IUserRegister } from "../../pages/RegisterPage";
// components
import TextInput from "../shared/TextInput";
import PasswordInput from "../shared/PasswordInput";
import Button from "../shared/Button";
import Checkbox from "../shared/Checkbox";
import { TFormVals, isFormReady } from "../../utils/utils_validation";

type Props = {
	vals: {
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
		rememberMe?: boolean;
	};
	handleChange: (e: ChangeEvent<Element>) => void;
	handleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
	handleRegister: (e: MouseEvent | FormEvent) => void;
	isSubmitting: boolean;
};

type ISignupError =
	| "Passwords do not match"
	| "Password must be at least 8 characters"
	| "Password must contain at least 1 special character"
	| "Username already exists"
	| "Username must be a valid email";

const reg = {
	email: /(@)/g,
	special: /[!"`'#%&,:;<>=@{}~\$(\)\*\+\/\\\?\[\]^\|]+/gm,
};

const signupIssues = {
	username: {
		requiredEmail: "Username must be a valid email",
		alreadyExists: "Username already exists",
	},
	password: {
		mismatch: "Passwords do not match",
		requiredLength: "Password must be at least 8 characters",
		requiredSpecial: "Password must contain at least 1 special character",
	},
};

const customCSS = {
	btn: {
		width: "100%",
		padding: "1rem 1.8rem",
	},
};

const getSignupErrors = (vals: IUserRegister) => {
	const { username, password, confirmPassword } = vals;
	const issues = [];
	if (!reg.email.test(username)) {
		issues.push(signupIssues.username.requiredEmail);
	}
	if (password !== confirmPassword) {
		issues.push(signupIssues.password.mismatch);
	}
	if (!(password.length >= 8) || !(confirmPassword.length >= 8)) {
		issues.push(signupIssues.password.requiredLength);
	}
	if (!reg.special.test(password) || !reg.special.test(confirmPassword)) {
		issues.push(signupIssues.password.requiredSpecial);
	}

	return issues;
};

const isFormValid = (vals: IUserRegister) => {
	const { username, email, password, confirmPassword } = vals;
	const formIsReady = isFormReady(vals as TFormVals, [
		"username",
		"email",
		"password",
		"confirmPassword",
	]);

	console.log("formIsReady", formIsReady);
	return formIsReady;
};

type ErrorProps = {
	vals: IUserRegister;
};

const SignupErrors = ({ vals }: ErrorProps) => {
	const errors = useMemo(() => {
		const { username, password, confirmPassword } = vals;
		if (!password || !confirmPassword) return [];
		if (username === "" || password === "" || confirmPassword === "") return [];

		return getSignupErrors(vals);
	}, [vals]);
	return (
		<ul className={styles.SignupErrors}>
			{errors &&
				errors.length > 0 &&
				errors.map((err, idx) => (
					<li key={idx} className={styles.SignupErrors_err}>
						{err}
					</li>
				))}
		</ul>
	);
};

const RegisterForm = ({
	vals,
	handleChange,
	handleCheckbox,
	handleRegister,
	isSubmitting = false,
}: Props) => {
	const [isReady, setIsReady] = useState<boolean>(false);
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		setIsReady(false);
		if (isFormValid(vals)) {
			setIsReady(true);
		}

		// const issues = getSignupErrors(vals);
		// setErrors(issues);

		return () => {
			isMounted = false;
		};
	}, [vals]);

	return (
		<form onSubmit={handleRegister} className={styles.RegisterForm}>
			<div className={styles.RegisterForm_title}>Signup</div>
			<div className={styles.RegisterForm_field}>
				<TextInput
					label="Username"
					id="username"
					name="username"
					val={vals?.username}
					handleChange={handleChange}
					isInvalid={vals?.username !== "" && vals?.username?.length < 4}
				/>
			</div>
			<div className={styles.RegisterForm_field}>
				<TextInput
					label="Email"
					id="email"
					name="email"
					val={vals?.email}
					handleChange={handleChange}
					isInvalid={vals.email !== "" && !/(@)/.test(vals.email)}
				/>
			</div>
			<div className={styles.RegisterForm_field}>
				<PasswordInput
					label="Password"
					id="password"
					name="password"
					val={vals?.password}
					handleChange={handleChange}
				/>
			</div>
			<div className={styles.RegisterForm_field}>
				<PasswordInput
					label="Confirm Password"
					id="confirmPassword"
					name="confirmPassword"
					val={vals?.confirmPassword}
					handleChange={handleChange}
				/>
			</div>
			<div className={styles.RegisterForm_field}>
				<div className={styles.RegisterForm_field_inner}>
					<Checkbox
						id="rememberMe"
						name="rememberMe"
						label="Remember me"
						val={vals?.rememberMe as boolean}
						handleCheckbox={handleCheckbox}
					/>
				</div>
			</div>
			<div className={styles.RegisterForm_field}>
				<Button
					type="submit"
					isDisabled={isSubmitting || !isReady}
					styles={customCSS.btn}
					handleClick={handleRegister}
				>
					{isSubmitting ? "Creating account..." : "Signup"}
				</Button>
			</div>
			<div className={styles.RegisterForm_field}>
				<div className={styles.RegisterForm_field_signup}>
					<div>Already have an account?</div>
					<NavLink to="/login" className={styles.Signup}>
						Login here
					</NavLink>
				</div>
			</div>
			<div className={styles.RegisterForm_field}>
				{/* <SignupErrors vals={vals} /> */}
			</div>
		</form>
	);
};

export default RegisterForm;

RegisterForm.defaultProps = {};

RegisterForm.propTypes = {};
