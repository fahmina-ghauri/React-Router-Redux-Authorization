import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

// var browerHistory = createBrowserHistory();

export class RequireRoleBase extends Component {

  
  ensureAuth(props) {
    const { isLoggedIn, unauthorizedPath, loginPath } = props;
    // if(!isRehydrated) {
    //   return false;
    // }
    console.log("logged in : " + isLoggedIn + "unauthorized path " + unauthorizedPath + " login path " + loginPath);
    if(!isLoggedIn) {
      // send to login
      this.props.history.push(loginPath);

    } else if(!this.hasRequiredRole(props)) {
      // send to forbidden page
      this.props.history.push(unauthorizedPath);

      
    }
    return true;
  }

  hasRequiredRole({ requiredRole, currentUserRole }) {
    return !requiredRole || requiredRole.indexOf(currentUserRole) > -1;
  }

  componentWillReceiveProps(props) {
    console.log("will recieve props");
    this.ensureAuth(props);
  }

  componentDidMount() {
    console.log("did mount")
    this.ensureAuth(this.props);
  }

  render() {
    const { isLoggedIn, children } = this.props;
    console.log("logged in "+ isLoggedIn + " " + typeof(isLoggedIn));
    if(!isLoggedIn || !this.hasRequiredRole(this.props)) {
      // don't accidentally render anything
      return null;
    }
    return <div>{children}</div>;
  }
}

const mapStateToProps = state => {
  const auth = state.auth;
  
  return {
    // isRehydrated: true,
    isLoggedIn: auth.isLoggedIn,
    currentUserRole: auth.self && auth.role ? auth.role : 'nobody'
  };
};

const RequireRoleConnected = withRouter(connect(mapStateToProps)(RequireRoleBase));

export const RequireRole = (WrappedComponent, requireRoleProps = {}, unauthorizedPath = '/forbidden', loginPath = '/login') => {
  return function(props) {
    return (
      <RequireRoleConnected {...requireRoleProps} unauthorizedPath={unauthorizedPath} loginPath={loginPath}>
      <WrappedComponent {...props} />
      </RequireRoleConnected>
      );
  };
};

RequireRoleBase.propTypes = {
    isLoggedIn: propTypes.bool,
    currentUserRole: propTypes.string,
    requiredRole: propTypes.array
  }


export default withRouter(RequireRole);