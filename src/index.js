import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { RequireRole } from './roles/RequireRole';
import { page_permissions, addPagePermissions } from './rolePermissions/app_page_permissions';
import NotFound from './components/NotFound';
import { authorize_user } from './action/index.js';
import authorize_user_reducer from './reducer/authorize_user_reducer';

class Authorizer extends Component {

	render() {
		console.log
		var page = page_permissions.map((p)=> {
			console.log(p.url);
			if(p.url !== undefined && p.component !== undefined && p.requiredRole !== undefined) {
				return ( <Route key={p.url} path={`${this.props.match.url}${p.url}`} component={RequireRole(p.component, {requiredRole: p.requiredRole}, this.props.unauthorizedPath, this.props.loginPath)} />);
			}
        // return null;
    });

		return  (
			<div>
				<Switch>
					{page} 
					<Route exact path={this.props.match.url} component={RequireRole(this.props.AuthDefaultRoute, this.props.unauthorizedPath, this.props.loginPath)} />  
					<Route component={NotFound} />
				</Switch>
			</div>
			);
	}
}

export default Authorizer;
export {addPagePermissions};
export {authorize_user};
export {authorize_user_reducer};
