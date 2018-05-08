
var initialState = JSON.parse(localStorage.getItem('auth')) || {}


export default function(state=initialState, action) {
	
	switch(action.type) {
		case "USER_AUTHORIZE":
			localStorage.setItem('auth', JSON.stringify(action.payload));
			return action.payload;

		default:
			return state;
	}
	
}