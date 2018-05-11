import React, { Component } from 'react'; 
import '../assets/dashboard.css';
import {getStudentPendingList} from '../helpers/api';
import { Icon } from 'semantic-ui-react';
import { StudentInfo, Navbar, StudentMenu } from '../components';
import { getStudentInfo } from '../helpers/api';
import Media from "react-media";
class ShowStudentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.openPendingReports = this.openPendingReports.bind(this);
        this.openHistory = this.openHistory.bind(this);
    }

    async componentDidMount(){
        let lists = await getStudentPendingList(this.props.auth, this.props.match.params.id)
        let student = await getStudentInfo(this.props.auth, this.props.match    .params.id);
        this.setState({lists: lists.data, student: student.data});
        console.log(student.data);
    }
    
    openPendingReports () {

    }

    openHistory() {


    }

    render() {
        let responsive = '';
        <Media query="(max-width: 768px)">
                {matches => responsive = matches ? 'column' : 'row'}
        </Media>
       return (
        <div>
            <Navbar user={this.props.user}/>
            <div className={ "container" + responsive + "centered"}>
                <div className="container column centered">
                    { this.state.student && <StudentInfo student={this.state.student}/> }
                    <StudentMenu openHistory={this.openHistory} openPendingReports={this.openPendingReports}/>
                    <div className="container column centered" id="dashboard_container">
                        <h1 style={{"text-align":"center"}} id="dashboard_students_title">PENDING REPORTS</h1>
                        <div id="dashboard_hr"></div>
                    </div>
                </div>
            </div>
        </div>
       )
    }
}

export default ShowStudentPage;
