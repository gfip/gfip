import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import '../assets/showStudent.css';

class StudentMenu extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="showStudent_studentMenu container column centered">
                <div onClick={ this.props.openPendingReports } className="menuNavbarCell container centered">Pending reports</div>  
                <div onClick={ this.props.openHistory } className="menuNavbarCell container centered">History</div> 
            </div>
        );
  }
}

export default StudentMenu;
