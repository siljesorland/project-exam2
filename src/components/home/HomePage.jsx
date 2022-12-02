import Logo from "./../images/Logo.png";
import { Link } from "react-router-dom";

export default function HomePage() {
	return (
		<>
			<div className="center">
				<h2>Welcome to</h2>
				<h3>Blazon!</h3>
				<p>: to publish widely</p>
				<img src={Logo} alt="Logo" height="200px"></img>
				<Link to={"/login"}>
							<p>Log in here</p>
						</Link>
						<>Don't have a user yet?</>
						<Link to={"/register"}>
							<p>Register here!</p>
						</Link></div>
		</>
	);
}