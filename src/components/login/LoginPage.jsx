import LoginForm from "./LoginForm";
import Logo from "./../images/Logo.png";


export default function LoginPage() {
	return (
		<>
		<div className="center">
		<img src={Logo} alt="Logo" height="200px"></img>
			<LoginForm />
			</div>
		</>
	);
}