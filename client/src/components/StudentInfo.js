import React, { Component } from 'react';
import '../assets/show_student.css';

class StudentInfo extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let student_name = this.props.student.name.split(' ');
        student_name = student_name[0] + ' ' + student_name[student_name.length-1];
        return (
            <div className="show_student_studentInfo container column centered">
                <b><h3> { student_name } </h3></b>
                <em><h5> { this.props.student.username + "@cin.ufpe.br" } </h5> </em>
            </div>
        );
  }
}

export default StudentInfo;
