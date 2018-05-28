import React, { Component } from 'react'; 
import '../assets/dashboard.css';
import {getStudentPendingList} from '../helpers/api';
import { Navbar, Lists, ReportHistory, MenuBlock, InfoBlock} from '../components';
import { getStudentInfo, getStudentPendingReports, discardListReport } from '../helpers/api';
class ShowStudentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            lists: [],
            student: '',
            openLists: true,
            discardEnabled: true
        }
        this.openPendingReports = this.openPendingReports.bind(this);
        this.openHistory = this.openHistory.bind(this);
        this.discardReport = this.discardReport.bind(this);
    }
    
    async componentDidMount(){
        try{
            let lists = await getStudentPendingList(this.props.auth, this.props.match.params.id)
            let student = await getStudentInfo(this.props.auth, this.props.match.params.id);
            let reports = await getStudentPendingReports(this.props.auth, this.props.match.params.id);
            let studentName = student.data.name.split(' ');
            studentName = studentName[0] + ' ' + studentName[studentName.length-1];
            student.data.name = studentName;
            this.setState({lists: lists.data, student: student.data, reports: reports.data});
        } catch (err){
            console.log(err.message);
        }
    }
    openPendingReports () {
        this.setState({openLists: true})
    }
    
    openHistory() {
        this.setState({openLists: false})
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
        return (
        <div className="container column centered">
            <Navbar user={this.props.user}/>
            <div>
                <div className="container column centered">
                    { this.state.student && <InfoBlock class='show_student_studentInfo' title={this.state.student.name} subtitle={this.state.student.username + '@cin.ufpe.br'}/> }
                    <div className="show_student_studentMenu container column centered">
                        <MenuBlock callback={this.openPendingReports} title='Pending reports' active={this.state.openLists}/>
                        <MenuBlock callback={this.openHistory} title='History' active={this.state.openHistory}/>
                    </div>
                </div>
                { this.state.openLists && <Lists lists={this.state.lists} discardReport={this.discardReport} student_id={this.state.student._id}/> } 
                { !this.state.openLists && <ReportHistory reports={this.state.reports}/> } 
            </div>
        </div>
       )
    }
}

export default ShowStudentPage;
