import React, { Component } from 'react';
import logo from './img/logo.svg';
import {Button, Form } from 'semantic-ui-react';
import './login.css';

class LoginIndex extends Component {
  handleSubmit(){
    
  }

  render() {
    return (
      <div id="main" className="container column centered">
          <div className="container column centered">
          <img src={logo} id="logo" alt="logo" />
          <Form onSubmit={this.handleSubmit} id="loginForm">
            <Form.Field>
              <input name="username" placeholder='Username'/>
            </Form.Field>
            <Form.Field>
              <input type="password" name="password" placeholder='Password'/>
            </Form.Field>
            <div className="buttonHolder">
              <Button type="submit" id="loginButton">Login</Button>
            </div>
          </Form>
          <p>Doesn't have an account yet? <a id="registerLink" href="/register">Register here</a></p>
          </div>
      </div>
    );
  }
}

export default LoginIndex;
