import React, { Component } from 'react'; 
import '../assets/dashboard.css';
import {getStudentPendingList} from '../helpers/api';
import { StudentInfo, Navbar, StudentMenu, Lists, ReportHistory} from '../components';
import { getStudentInfo, getStudentPendingReports, discardListReport } from '../helpers/api';
import Media from "react-media";
class ShowStudentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            lists: [],
            student: '',
            openLists: true,
            openHistory: false,
            discardEnabled: true
        }
        this.openPendingReports = this.openPendingReports.bind(this);
        this.openHistory = this.openHistory.bind(this);
        this.discardReport = this.discardReport.bind(this);
    }

    async componentDidMount(){
        let lists = await getStudentPendingList(this.props.auth, this.props.match.params.id)
        let student = await getStudentInfo(this.props.auth, this.props.match.params.id);
        let reports = await getStudentPendingReports(this.props.auth, this.props.match.params.id);
        this.setState({lists: lists.data, student: student.data, reports: reports.data});
    }
    
    openPendingReports () {
        this.setState({openLists: true, openHistory: false})
    }
    
    openHistory() {
        this.setState({openLists: false, openHistory: true})
    }

    discardReport = async event => {
        event.preventDefault();
        try {
            let list_id = event.target.dataset.id;
            if(this.state.discardEnabled) {
                this.setState({discardEnabled: false});
                await discardListReport(this.props.auth, this.state.student._id, list_id); 
                let newLists = this.state.lists.filter((list) => { return list._id !== list_id })
                this.setState({lists: newLists});
            }
        } catch (err) {
            console.log(err.message);
        }
        this.setState({discardEnabled: true});
    }

    render() {
        let responsive = '';
        <Media query="(max-width: 768px)">
                {matches => responsive = matches ? 'column' : 'row'}
        </Media>
        
        return (
        <div className="container column centered">
            <Navbar user={this.props.user}/>
            <div className={ "container" + responsive + "centered"}>
                <div className="container column centered">
                    { this.state.student && <StudentInfo student={this.state.student}/> }
                    <StudentMenu openHistory={this.openHistory} openPendingReports={this.openPendingReports}/>
                </div>
                { this.state.openLists && <Lists lists={this.state.lists} discardReport={this.discardReport}/> } 
                { this.state.openHistory && <ReportHistory reports={this.state.reports}/> } 
            </div>
        </div>
       )
    }
}

export default ShowStudentPage;
