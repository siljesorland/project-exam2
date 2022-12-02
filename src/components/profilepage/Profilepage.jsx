import Heading from "../layout/Heading";
import UserProfile from "./ProfileDetail";
import CreatePost from "./CreatePost";

export default function ProfilePage() {
	return (
		<>
		
			<Heading content="Profile Page" />
			<div className="container">Profile Page</div>
			<UserProfile />
			<CreatePost />
		</>
	);
}