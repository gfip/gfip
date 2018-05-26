import React, { Component } from 'react';
import '../assets/show_student.css';

class StudentMenu extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            lists: true
        };
    }

    setLists(e, bool){
        this.setState({lists: bool});
    }

    render() {
        let classLists = this.state.lists ? 'show_student_menuActive' : '';
        let classHistory = this.state.lists ? '' : 'show_student_menuActive';

        return (
            <div className="show_student_studentMenu container column centered">
                <div ref="element" onClick={ (e) => { this.props.openPendingReports(e); this.setLists(e, true) } } className={"menuNavbarCell container centered " + classLists}>Pending reports</div>  
                <div onClick={ (e) => {this.props.openHistory(); this.setLists(e, false)} } className={"menuNavbarCell container centered " + classHistory}>History</div> 
            </div>
        );
  }
}

export default StudentMenu;
