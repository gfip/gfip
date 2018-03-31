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
      active: this.props.active
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
            let status = res.data.code ? res.data.err : res.data //se houver variavel "code", então houve erro na resposta. 
            this.setState({status: status});
            
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
                <input name="username" onChange={this.handleChange} placeholder='Username'/>
                <span style={{color: "#C2C2C2"}}>* Your username from CIn's login system</span>
            </Form.Field>
            <Form.Field>
                <input type="password" onChange={this.handleChange} name="password" placeholder='Password'/>
                <span className="statusFeedback"> {this.state.status} </span>
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