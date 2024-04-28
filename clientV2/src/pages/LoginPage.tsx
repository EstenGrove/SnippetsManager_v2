import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../css/pages/LoginPage.module.scss";
import LoginForm from "../components/login/LoginForm";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { IUserAuth, loginUser } from "../features/currentUser/currentUserSlice";
import { login, setRememberMe } from "../utils/utils_auth";
import Dialog, { IDialog } from "../components/shared/Dialog";
import Button from "../components/shared/Button";

interface IUserCreds {
	username: string;
	password: string;
	rememberMe: boolean;
}

export const MOCK_USER = {
	userID: "669b0e5d-d07c-4f0a-90ff-7c75e7f3f9e0",
	username: "EstenGrove",
	email: "estengrove99@gmail.com",
	password: "wd3y$E?tVNQ5MwLx+jUA",
	// real fields
	token: "SOME-TOKEN-HERE",
	sessionID: "SOME-SESSION-ID-HERE",
	// expiry: addHoursToDate(new Date(), 3),
	isAuthenticated: true,
	isAdmin: true,
};

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [dialog, setDialog] = useState<IDialog>({
		show: false,
		title: null,
		msg: null,
	});
	const [userCredentials, setUserCredentials] = useState<IUserCreds>({
		username: "",
		password: "",
		rememberMe: true,
	});

	const handleChange = (e: ChangeEvent<Element>) => {
		const { name, value } = e.target as HTMLInputElement;
		setUserCredentials({
			...userCredentials,
			[name]: value as keyof IUserCreds,
		});
	};

	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		setUserCredentials({
			...userCredentials,
			rememberMe: e.target.checked,
		});
	};

	const handleLogin = async (e: MouseEvent | FormEvent) => {
		e.preventDefault();
		const { username, password } = userCredentials;
		setIsSubmitting(true);
		// fire off request
		const results = await login(username, password);

		// if failed, open dialog box
		if (!results || results.Status !== "SUCCESS") {
			return setDialog({
				show: true,
				title: results?.Data?.Title,
				msg: results?.Data?.Msg,
			});
		} else {
			const { Session, User } = results.Data;
			const userAuth: IUserAuth = {
				userID: User.UserID,
				username: User.Username,
				email: User.Email,
				password: null,
				// auth fields
				token: Session.Token,
				sessionID: Session.SessionID,
				expiry: Session.SessionExpiry,
				sessionStart: Session.SessionStart,
				isAuthenticated: true,
				lastRefreshedAt: new Date().toString(),
			};
			// create session cache, if user wants it
			if (userCredentials?.rememberMe) {
				setRememberMe({
					userID: User.UserID,
					sessionID: Session.SessionID,
					sessionExpiry: Session.SessionExpiry,
					sessionStart: Session.Start,
					sessionToken: Session.Token,
					sessionLength: 5,
					lastRefreshedAt: new Date().toString(),
				});
			}
			dispatch(loginUser(userAuth));
			navigate("/dashboard");
		}
	};

	const closeDialog = () => {
		setUserCredentials({ ...userCredentials, username: "", password: "" });
		setDialog({ show: false, msg: null, title: null });
		setIsSubmitting(false);
	};

	return (
		<div className={styles.LoginPage}>
			<section className={styles.LoginPage_left}>
				<h1 className={styles.LoginPage_left_title}>Welcome Back!</h1>
			</section>
			<section className={styles.LoginPage_right}>
				<LoginForm
					vals={userCredentials as IUserCreds}
					isSubmitting={isSubmitting}
					handleChange={handleChange}
					handleLogin={handleLogin}
					handleCheckbox={handleCheckbox}
				/>
			</section>

			{dialog.show && (
				<Dialog
					title={(dialog?.title ?? "Invalid Credentials") as string}
					closeDialog={closeDialog}
					footer={<Button handleClick={closeDialog}>Try Again?</Button>}
				>
					<div className={styles.LoginPage_dialog}>{dialog.msg}</div>
				</Dialog>
			)}
		</div>
	);
};

export default LoginPage;

LoginPage.defaultProps = {};

LoginPage.propTypes = {};
