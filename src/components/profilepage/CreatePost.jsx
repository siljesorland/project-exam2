import { useContext, useState,} from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "./../common/FormError";
import { BASE_URL, } from "./../../constants/api";
import AuthContext from "./../../context/AuthContext";
import axios from 'axios';



const url = BASE_URL + `/api/v1/social/posts`;

const schema = yup.object().shape({
	username: yup.string().required("Please enter your username"),
	password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);

	const history = useHistory();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [ setAuth] = useContext(AuthContext);

	async function onSubmit(data) {
		setSubmitting(true);
		setServerError(null);

		console.log(data);

		try {
			const response = await axios.post(url, data);
			console.log("response", response.data);
			setAuth(response.data);
			history.push("/dashboard");

		} catch (error) {
			console.log("error", error);
			setServerError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (    
  <div className="posts">
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Create your own post!</p>

      {serverError && <FormError>{serverError}</FormError>}
      <fieldset disabled={submitting}>
        <div>
          <input {...register("title")} id="title" placeholder="Title of your post" />
          {errors.title && <FormError>{errors.title.message}</FormError>}
        </div>

        <div>
          <textarea   {...register("body")} id="body" placeholder="Write your post here" />
          {errors.body && <FormError>{errors.body.message}</FormError>}
        </div>

        <div>
          <input {...register("media")} id="media" placeholder="Image url" />
          {errors.media && <FormError>{errors.media.message}</FormError>}
        </div>

        <button>{submitting ? "Adding post..." : "Post"}</button>
      </fieldset>
    </form>
  </div>
);
}