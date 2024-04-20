import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";

type Props = {
	children?: ReactNode;
};

const AppProviders = ({ children }: Props) => {
	return (
		<AuthProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</AuthProvider>
	);
};

export { AppProviders };
