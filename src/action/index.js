export const authorize_user = (username, role, isLoggedIn) => {
	console.log("you clicked on login..");

	return {
		type: "USER_AUTHORIZE",
		payload: {
			isLoggedIn: isLoggedIn,
			self: username,
			role: role
		}
	};
}	