import React, { Component } from 'react'; 
import '../assets/dashboard.css';
import {getStudentPendingList} from '../helpers/api';
import { Navbar, Lists, ReportHistory, MenuBlock, InfoBlock} from '../components';
import { getStudentInfo, getStudentPendingReports, discardListReport } from '../helpers/api';
import Media from "react-media";
class ShowStudentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
           
        }
       
    }
    
    async componentDidMount(){
       
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
                    {/* { this.state.student && <InfoBlock title={} subtitle={}/> } */}
                    <div className="show_student_studentMenu container column centered">
                        {/* <MenuBlock callback={} title='Pending reports' active={}/>
                        <MenuBlock callback={} title='History' active={}/> */}
                    </div>
                </div>
                { this.state.openLists && <Lists lists={this.state.lists} discardReport={this.discardReport}/> } 
                { this.state.openHistory && <ReportHistory reports={this.state.reports}/> } 
            </div>
        </div>
       )
    }
}

export default ShowStudentPage;
