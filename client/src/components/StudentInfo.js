import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import '../assets/showStudent.css';

class StudentInfo extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="showStudent_studentInfo container column centered">
                <b><h3> { this.props.student.name } </h3></b>
                <em><h5> { this.props.student.username + "@cin.ufpe.br" } </h5> </em>
            </div>
        );
  }
}

export default StudentInfo;
