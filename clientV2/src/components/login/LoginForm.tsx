import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../css/login/LoginForm.module.scss";
import TextInput from "../shared/TextInput";
import PasswordInput from "../shared/PasswordInput";
import Button from "../shared/Button";
import Checkbox from "../shared/Checkbox";
import { NavLink } from "react-router-dom";

type Props = {
	vals: {
		username: string;
		password: string;
		rememberMe?: boolean;
	};
	handleChange: (e: ChangeEvent<Element>) => void;
	handleCheckbox: (e: ChangeEvent<HTMLInputElement>) => void;
	handleLogin: (e: MouseEvent | FormEvent) => void;
	isSubmitting: boolean;
};

const customCSS = {
	btn: {
		width: "100%",
		padding: "1rem 1.8rem",
	},
};

const isFormValid = (vals: {
	username: string;
	password: string;
	rememberMe?: boolean;
}) => {
	const { username, password } = vals;
	// Required fields
	if (!username || !password) return false;
	if (username === "" || password === "") return false;
	// Min. length
	if (username?.length < 5) return false;
	if (password?.length < 5) return false;

	return true;
};

const LoginForm = ({
	vals,
	handleChange,
	handleLogin,
	handleCheckbox,
	isSubmitting = false,
}: Props) => {
	const [isReady, setIsReady] = useState<boolean>(false);

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		setIsReady(false);
		if (isFormValid(vals)) {
			setIsReady(true);
		}

		return () => {
			isMounted = false;
		};
	}, [vals]);

	return (
		<form onSubmit={handleLogin} className={styles.LoginForm}>
			<div className={styles.LoginForm_title}>Login</div>
			<div className={styles.LoginForm_field}>
				<TextInput
					label="Username/Email"
					id="username"
					name="username"
					val={vals?.username}
					handleChange={handleChange}
					isInvalid={vals?.username !== "" && vals?.username?.length <= 4}
				/>
			</div>
			<div className={styles.LoginForm_field}>
				<PasswordInput
					label="Password"
					id="password"
					name="password"
					val={vals?.password}
					handleChange={handleChange}
					isInvalid={vals?.password !== "" && vals?.password?.length <= 6}
				/>
			</div>
			<div className={styles.LoginForm_field}>
				<div className={styles.LoginForm_field_inner}>
					<Checkbox
						id="rememberMe"
						name="rememberMe"
						label="Remember me"
						val={vals?.rememberMe as boolean}
						handleCheckbox={handleCheckbox}
					/>
					<NavLink to="/forgot" className={styles.ForgotPassword}>
						Forgot Password?
					</NavLink>
				</div>
			</div>
			<div className={styles.LoginForm_field}>
				<Button
					type="submit"
					isDisabled={isSubmitting || !isReady}
					styles={customCSS.btn}
					handleClick={handleLogin}
				>
					{isSubmitting ? "Logging in..." : "Login"}
				</Button>
			</div>
			<div className={styles.LoginForm_field}>
				<div className={styles.LoginForm_field_signup}>
					<div>Need an account?</div>
					<NavLink to="/signup" className={styles.Signup}>
						Signup here
					</NavLink>
				</div>
			</div>
		</form>
	);
};

export default LoginForm;

LoginForm.defaultProps = {};

LoginForm.propTypes = {};
