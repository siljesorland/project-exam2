import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import DashboardPage from "./components/dashboard/DashboardPage";
import PostDetail from "./components/dashboard/posts/PostDetail"
import UserDetail from "./components/dashboard/profiles/UserDetail";
import ProfilePage from "./components/profilepage/Profilepage";
import Nav from "./components/layout/Nav";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Nav />

				<div className="container">
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/login">
							<LoginPage />
						</Route>
						<Route path="/dashboard" exact>
							<DashboardPage />
						</Route>
						<Route path="/register" exact>
							<RegisterPage />
						</Route>
						<Route path="/dashboard/posts/:id" element={<PostDetail />}>
							<PostDetail />
						</Route>
						<Route path="/dashboard/profiles/:name" element={<UserDetail />}>
							<UserDetail />
						</Route>
						<Route path="/profilepage" exact>
							<ProfilePage />
						</Route>

					</Switch>
				</div>
			</Router>
		</AuthProvider>
	);
}
export default App;