import React, { Component } from 'react';
import logo from '../assets/img/logo.svg';
import AuthService from '../components/AuthService';
import RegisterForm from '../components/RegisterForm'; 
import { withRouter } from "react-router-dom";
import { Button, Form } from 'semantic-ui-react';
import '../assets/login.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.AuthService = new AuthService();
    this.state = {
      username: "",
      password: "",
      register: false
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
    this.AuthService.login({username: this.state.username, password: this.state.password})
    .then((res) => {
      return this.props.history.push("/dashboard");
    }).catch((err) => {
      this.setState({status: err.response.data});
    })
  }

  alterRegisterForm = (event, opened) => {
    this.setState({registerOpened: opened});
  }

  render() {
    return (
      <div id="main" className="container column centered">
          <div className="container column centered">
            <img src={logo} id="logo" alt="logo" />
            <Form onClick={(e) => { this.alterRegisterForm(e, false)}} onSubmit={this.handleSubmit} id="loginForm">
              <Form.Field>
                <input name="username" onChange={this.handleChange} placeholder='Username'/>
              </Form.Field>
              <Form.Field>
                <input type="password" onChange={this.handleChange} name="password" placeholder='Password'/>
              </Form.Field>
              <span className="statusFeedback"> {this.state.status} </span>
              <div className="buttonHolder">
                <Button type="submit" id="loginButton">Login</Button>
              </div>
            </Form>
            <p id="registerText">Doesn't have an account yet? <a id="registerLink" onClick={(e) => { this.alterRegisterForm(e, true)}}>Register here</a></p>
            <RegisterForm active={this.state.registerOpened}/>
          </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
