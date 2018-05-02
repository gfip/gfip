import React, { Component } from 'react';
import '../assets/navbar.css';
class StudentCard extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log(this.props.student);
        console.log('yo');
        return (
            <div>
                <h1>{this.props.student.name}</h1>
            </div>
        );
  }
}

export default StudentCard;
