# React-Router-Redux-Authorization
This module helps you in defining roles and permissions that are accessed only by authorized users. It is based on react router and redux.

Configurations:

React Router Redux Role-Based-User-Permissions: 

1. npm install --save react-router-redux-authorization

2. create config/authConfig.js file 
   
   Add import { addPagePermissions } from 'react-router-redux-authorization';
	
	addPagePermissions({
		'url': '/edit',
		'component': HomeAdmin,
		'requiredRole': ['admin'] 
	},{},...); 

   import 'config/authConfig' in index.js

3. Add import Authorizer from 'react-router-redux-authorization' in App.js
   
   Add <Route path="/auth" render={(props) => <Authorizer {...props} AuthDefaultRoute={Protected} />} />	
	
   optional props: unauthorizedPath={"/forbidden"} 	- To set no page access path 
		   		   loginPath={"/login"} 		    - To set your custom login path


   These "/login" and "/forbidden" show empty page if no component is bind to these path or you can set your own urls to these props. 

   create your own /login and /forbidden urls to display components to unauthorized user.

4. import { authorize_user } from 'react-router-redux-authorization' in Login.js - call this action in 	  you login component to authorize user.

	Add it like this : 
	" export default connect(mapStateToProps,{authorizeUser: authorize_user})(Login) "

	and call this action in login function "this.props.authorizeUser(name, role, loggedIn)"

5. import {authorize_user_reducer} from 'react-router-redux-authorization' in reducers/index.js

   use like this : " auth: authorize_user_reducer "
