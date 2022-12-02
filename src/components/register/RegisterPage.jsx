import Heading from "../layout/Heading";
import RegisterForm from "./RegisterForm";


export default function RegisterPage() {
    return (
        <>
        <div className="center">
            <Heading content="Register"/>
            <div className="container">RegisterPage</div>
            <RegisterForm />
            </div>
        </>
    );
}