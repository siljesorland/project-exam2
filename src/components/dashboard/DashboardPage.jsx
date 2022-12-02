import PostsList from "./posts/PostList";
import UsersList from "./profiles/UsersList";


export default function DashboardPage() {
	return (
	<>
			<div className="center">
				<h3>Blazon!</h3>
			</div>
			<div class="container">
				<div class="row">
					<div class="col-7">
						<PostsList />
						
					</div>
					<div class="col-5">
						<h2>List of users</h2>
						<UsersList />
					</div>
				</div>
			</div>
			</>
	);
}

