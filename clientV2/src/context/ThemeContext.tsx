import { ReactNode, createContext, useState } from "react";

export type TTheme = "light" | "dark" | "custom";
export type ThemeContext = TTheme;

const initialState = document.documentElement.dataset.theme as TTheme;
const ThemeContext = createContext<ThemeContext>(initialState);

type Props = {
	children?: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState<TTheme>(initialState);

	const toggleTheme = () => {
		const next = theme === "light" ? "dark" : "light";
		setTheme(next);
		document.documentElement.dataset.theme = next;
	};

	const changeTheme = (targetTheme: TTheme) => {
		setTheme(targetTheme);
		document.documentElement.dataset.theme = targetTheme;
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeProvider, ThemeContext };
