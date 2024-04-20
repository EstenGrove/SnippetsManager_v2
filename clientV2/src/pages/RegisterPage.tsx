import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../css/pages/RegisterPage.module.scss";
import { registerUser } from "../utils/utils_user";
// components
import RegisterForm from "../components/register/RegisterForm";
import Dialog from "../components/shared/Dialog";
import Button from "../components/shared/Button";

export interface IUserRegister {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	rememberMe?: boolean;
}

const MOCK_USER = {
	userID: "3895608d-3d77-498e-ad57-d81ec7fed215",
	username: "Echo1",
	email: "echo.alchemist.design@gmail.com",
	password: "wd3y$E?tVNQ5MwLx+jUA",
	hashedPassword:
		"$2b$10$lb6g6Tym3YdmqIBhC42CGuFmg6PaVnUjuTYvv0.Pu/nG6jTBVGeOC",
	// real fields
	token: "SOME-TOKEN-HERE",
	sessionID: "SOME-SESSION-ID-HERE",
	// expiry: addHoursToDate(new Date(), 3),
	isAuthenticated: true,
	isAdmin: true,
};

interface IDialog {
	show: boolean;
	title: string | null;
	msg: string | null;
}

const initialState = {
	username: MOCK_USER.username,
	email: MOCK_USER.email,
	password: MOCK_USER.password,
	confirmPassword: MOCK_USER.password,
	rememberMe: false,
};

const RegisterPage = () => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [dialog, setDialog] = useState<IDialog>({
		show: false,
		title: null,
		msg: null,
	});
	const [userCredentials, setUserCredentials] =
		useState<IUserRegister>(initialState);

	const handleChange = (e: ChangeEvent<Element>) => {
		const { name, value } = e.target as HTMLInputElement;
		setUserCredentials({
			...userCredentials,
			[name]: value as keyof IUserRegister,
		});
	};
	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setUserCredentials({
			...userCredentials,
			rememberMe: e.target.checked,
		});
	};

	const handleRegister = async (e: MouseEvent | FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		const results = await registerUser({
			username: userCredentials.username,
			email: userCredentials.email,
			password: userCredentials.password,
		});

		console.log("results", results);
		if (results.Status === "FAILED") {
			setIsSubmitting(false);
			return setDialog({
				show: true,
				title: results.Data.Title,
				msg: results.Data.Msg,
			});
		} else {
			setIsSubmitting(false);
		}
	};

	const actions = (
		<>
			<Button
				handleClick={() => setDialog({ show: false, msg: null, title: null })}
			>
				Close
			</Button>
		</>
	);

	return (
		<div className={styles.RegisterPage}>
			<section className={styles.RegisterPage_left}>
				<h1 className={styles.RegisterPage_left_title}>Create an Account!</h1>
			</section>
			<section className={styles.RegisterPage_right}>
				<RegisterForm
					vals={userCredentials as IUserRegister}
					isSubmitting={isSubmitting}
					handleChange={handleChange}
					handleRegister={handleRegister}
					handleCheckbox={handleCheckbox}
				/>
			</section>

			{dialog.show && (
				<Dialog
					title={(dialog?.title ?? "Invalid Credentials") as string}
					closeDialog={() => setDialog({ show: false, msg: null, title: null })}
					footer={actions}
				>
					<div className={styles.RegisterPage_dialog}>{dialog.msg}</div>
				</Dialog>
			)}
		</div>
	);
};

export default RegisterPage;

RegisterPage.defaultProps = {};

RegisterPage.propTypes = {};
