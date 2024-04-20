import "./App.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AppProviders } from "./context/AppProviders";
import { Provider } from "react-redux";
import { store } from "./store/store";
// pages' components
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
	return (
		<Router>
			<Provider store={store}>
				<AppProviders>
					<div className="App">
						<div className="App_main">
							<Routes>
								<Route path="dashboard/*" element={<DashboardPage />} />
								<Route path="/forgot" element={<ForgotPasswordPage />} />
								<Route path="/signup" element={<RegisterPage />} />
								<Route path="/login" element={<LoginPage />} />
							</Routes>
						</div>
					</div>
				</AppProviders>
			</Provider>
		</Router>
	);
}

export default App;
