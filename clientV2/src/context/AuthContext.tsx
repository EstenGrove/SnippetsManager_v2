import { ReactNode, createContext, useContext, useState } from "react";

type TAuthContext = {
	userID: string | null;
	email: string | null;
	username?: string | null;
	password: string | null;
	token: string | null;
	sessionID: string | null;
	expiry: string | null;
	isAuthenticated: boolean;
	isAdmin?: boolean;
};

const initialAuthState: TAuthContext = {
	userID: null,
	username: null,
	email: null,
	password: null,
	token: null,
	sessionID: null,
	expiry: null,
	isAuthenticated: false,
	isAdmin: false,
};

const AuthContext = createContext<TAuthContext>(initialAuthState);

type Props = {
	children?: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
	const [authData, setAuthData] = useState<TAuthContext>(initialAuthState);

	return (
		<AuthContext.Provider value={{ authData, setAuthData }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };
