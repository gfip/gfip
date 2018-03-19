import AuthService from './AuthService';
import React from 'react';
import {Route, Redirect} from 'react-router-dom';

class PrivateRoute extends React.Component {
    constructor(props){
      super(props);
      this.AuthService = new AuthService();
      this.state = {
        isFetching: true,
        isSuccess: null,
        user: null
      };
    }
  
    componentDidMount() {
      this.AuthService.loggedIn()
      .then((res) => {
        this.setState({ isFetching: false, isSuccess: true, user: res.data });
      })
      .catch((err)=> {
        this.setState({ isFetching: false, isSuccess: false });
      });
    }
  
    render() {
      const { isFetching, isSuccess, user} = this.state;    
      const { exact, path } = this.props;
      const Component = this.props.component;
      return (
        <Route exact={exact} path={path} render={rest => {
          const success = (
            <Component user={user} {...rest}/>    
          );
  
          const error = (
            <Redirect to={{
              pathname: '/',
              state: { from: this.props.location }
            }}/>
          );
  
          if(isFetching) {
            return null;
          }
  
          return isSuccess ? success : error;
        }}/>
      )
    } 
  }

  export default PrivateRoute;