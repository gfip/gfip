import React, { Component } from 'react';
import { register } from '../helpers/api';
import { Button, Form } from 'semantic-ui-react';
import '../assets/login.css';

class RegisterForm extends Component {
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
    if(this.validateForm()){
        register({username: this.state.username, password: this.state.password})
        .then((res) => {
            this.setState({status: res.data});
        }).catch((err) => {
            this.setState({status: err.response.data});
        })
    } else {
        this.setState({status: "Missing required fields."});
    }
  }

  render() {
    return (
      <div>


      </div>
    );
  }
}

export default LoginPage;
