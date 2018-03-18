import React, { Component } from 'react';
import logo from './img/logo.svg';
import { Button, Form } from 'semantic-ui-react';
import { login } from '../helpers/api';
import Cookies from 'universal-cookie';
import './login.css';

class LoginIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    login(this.state)
    .then((response) => new Cookies().set('gfip_token', response.data.token))
    .catch((err) => {
        this.setState({status: err.response.data});
    });
  }

  render() {
    return (
      <div id="main" className="container column centered">
          <div className="container column centered">
            <img src={logo} id="logo" alt="logo" />
            <Form onSubmit={this.handleSubmit} id="loginForm">
              <Form.Field>
                <input name="username" onChange={this.handleChange} placeholder='Username'/>
              </Form.Field>
              <Form.Field>
                <input type="password" onChange={this.handleChange} name="password" placeholder='Password'/>
              </Form.Field>
              <span id="statusFeedback"> {this.state.status} </span>
              <div className="buttonHolder">
                <Button type="submit" id="loginButton">Login</Button>
              </div>
            </Form>
            <p id="registerText">Doesn't have an account yet? <a id="registerLink" href="/register">Register here</a></p>
          </div>
      </div>
    );
  }
}

export default LoginIndex;
