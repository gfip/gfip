import React, { Component } from 'react';
import { register } from '../helpers/api';
import { Button, Form } from 'semantic-ui-react';
import '../assets/login.css';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      active: this.props.active,
      statusColor: "#b43232"
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

  componentWillReceiveProps(nextProps){
      this.setState({active: nextProps.active});
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.validateForm()){
        register({username: this.state.username, password: this.state.password})
        .then((res) => {
            let status, statusColor;
            let {username, password} = this.state;
            if(res.data.code){ // se houve erro, haverá outro tratamento.
                status = res.data.err;
                statusColor = "#b43232";
            } else {
                status = res.data;
                statusColor = "#56FE99";
                username = '';
                password = '';
            }
            this.setState({status: status, statusColor: color, username: username, password: password});
        }).catch((err) => {
            this.setState({status: err.response.data});
        })
    } else {
        this.setState({status: "Missing required fields."});
    }
  }

  render() {
    let activeClass = this.state.active ? "active" : "disabled"
    return (
      <div className={activeClass}>
        <Form onSubmit={this.handleSubmit} id="registerForm">
            <Form.Field>
                <input name="username" onChange={this.handleChange} value={this.state.username} placeholder='Username'/>
                <span style={{color: "#C2C2C2"}}>* Your username from CIn's login system</span>
            </Form.Field>
            <Form.Field>
                <input type="password" onChange={this.handleChange} value={this.state.password} name="password" placeholder='Password'/>
                <span style={{color: this.state.statusColor}}> {this.state.status} </span>
            </Form.Field>
            <div className="buttonHolder no-margin">
                <Button type="submit" id="registerButton">Register</Button>
            </div>
        </Form>
      </div>
    );
  }
}

export default RegisterForm;
