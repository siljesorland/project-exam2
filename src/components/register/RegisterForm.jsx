import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import ValidationError from "../common/FormError";

const nameRegex = /^[a-zA-Z0-9_]+$/;
const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no|noroff.no)$/;

const schema = yup.object().shape({
    name: yup.string().required("Please enter your name").matches(nameRegex, "The name value must not contain punctuation symbols apart from underscore (_)"),
    email: yup.string().required("Please enter your email.").email().matches(emailRegex, "The email value must be a valid stud.noroff.no or noroff.no email address."),
    password: yup.string().required("Please enter your password").min(8, "The password value must be at least 8 characters."),
    avatar: yup.string(),
    banner: yup.string(),
});

export default function RegisterForm() {
    const [, setSubmitting] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const [, setMessage] = useState("");

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const url = BASE_URL + "auth/register";

    async function registerSubmit(data) {
        setSubmitting(true);
        setRegisterError(null);
        console.log(data);

        const formData = JSON.stringify(data);

        const options = {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            console.log(json);
            if (response.ok) {
                history("/login");
                setMessage("Account created");
            } 
        } catch (error) {
            console.log("error", error);
            setRegisterError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(registerSubmit)}>
                {registerError && <ValidationError>{registerError}</ValidationError>}
                <div>
                    <label htmlFor="name">
                        Name:<span className="required">*</span>
                    </label>
                    <input id="name" {...register("name")} />
                    {errors.name && <ValidationError>{errors.name.message}</ValidationError>}
                </div>
                <div>
                    <label htmlFor="email">
                        Email:<span className="required">*</span>
                    </label>
                    <input id="email" {...register("email")} />
                    {errors.email && <ValidationError>{errors.email.message}</ValidationError>}
                </div>
                <div>
                    <label htmlFor="password">
                        Password:<span className="required">*</span>
                    </label>
                    <input id="password" {...register("password")} type="password" />
                    {errors.password && <ValidationError>{errors.password.message}</ValidationError>}
                </div>
                <div>
                    <label htmlFor="avatar">
                        Avatar:<span className="optional"> (optional)</span>
                    </label>
                    <input id="avatar" {...register("avatar")} />
                    {errors.avatar && <ValidationError>{errors.avatar.message}</ValidationError>}
                </div>
                <div>
                    <label htmlFor="banner">
                        Banner:<span className="optional"> (optional)</span>
                    </label>
                    <input id="banner" {...register("banner")} />
                    {errors.banner && <ValidationError>{errors.banner.message}</ValidationError>}
                </div>
                <button className="cta">Register</button>
            </form>
        </div>
    );
}