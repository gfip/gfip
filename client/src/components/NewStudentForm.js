import React, { Component } from 'react';
import { addStudent } from '../helpers/api';
import { Button, Form } from 'semantic-ui-react';
import '../assets/login.css';

class NewStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      statusColor: "#b43232"
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.name.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    if(this.validateForm()){
        try {
            let newStudent = await addStudent(this.props.auth, this.state.username, this.state.name);
            newStudent = newStudent.data;
            this.props.addStudent(newStudent);
            this.setState({status: ""});
            this.props.closeMe();
        } catch (err) {
            if(err.response)
                this.setState({status: err.response.data}); 
            else 
                this.setState({status: err.message});
        }
    } else {
        this.setState({status: "Missing required fields."});
    }
  }

  render() {
    let activeClass = this.props.active ? "active" : "disabled"
    return (
      <div ref={this.props.refMethod} id="dashboard_studentForm_wrapper" className={activeClass}>
        <Form onSubmit={this.handleSubmit} id="dashboard_newStudentForm">
            <Form.Field>
                <input name="name" onChange={this.handleChange} value={this.state.name} placeholder="Student's The Huxley name"/>
            </Form.Field>
            <Form.Field>
                <input onChange={this.handleChange} value={this.state.username} name="username" placeholder="Student's CIn login" />
                <span style={{color: this.state.statusColor}}> {this.state.status} </span>
            </Form.Field>
            <div className="buttonHolder no-margin">
                <Button type="submit" id="dashboard_addStudent_btn">Add</Button>
            </div>
        </Form>
      </div>
    );
  }
}

export default NewStudentForm;
