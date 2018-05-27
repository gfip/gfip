import React, { Component } from 'react'; 
import '../assets/report.css';
import { getListInfo } from '../helpers/api';
import { Navbar, MenuBlock, InfoBlock, ReportMain} from '../components';
import Media from "react-media";
class ReportPage extends Component {    
    constructor(props){
        super(props);
        this.state = {
            list: { submissions: []},
            actualProblem: {},
            problems: {}
        }
       
    }
    
    async componentDidMount(){
        try{
            let listInfo = await getListInfo(this.props.auth, this.props.match.params.student_id, this.props.match.params.list_id);
            let firstProblem = listInfo.data.submissions[0].problem;
            this.setState({list: listInfo.data, actualProblem: firstProblem, problems: {[firstProblem.theHuxleyId]: true}});
        } catch (err){
            console.log(err.message);
        }
    }

    render() {
        let responsive = '';
        <Media query="(max-width: 768px)">
                {matches => responsive = matches ? 'column' : 'row'}
        </Media>

        let obj = this;
        var menu = this.state.list.submissions.map((prob) => {
            let callback = function() {
                let newState = {problems:{}};
                newState.problems[prob.problem.theHuxleyId] = true;
                newState['actualProblem'] = prob.problem;
                for(var key in obj.state){
                    if(obj.state[key] === true){
                        newState[key] = false;
                    }
                }
                obj.setState(newState);
            }
            prob.problem.name = prob.problem.name.substring(0,30);
            return <MenuBlock key={prob.problem.theHuxleyId} callback={callback} title={prob.problem.name} active={this.state.problems[prob.problem.theHuxleyId]}/>
        })
        return (
        <div className="container column centered">
            <Navbar user={this.props.user}/>
            <div className={responsive}>
                <div className="container column centered">
                    { this.state.list.student && <InfoBlock class='report_listInfo' title={this.state.list.list.title} subtitle={'Score'}/> }
                    <div className="report_listMenu container column centered">
                        {/* <MenuBlock callback={} title='Pending reports' active={}/>
                        <MenuBlock callback={} title='History' active={}/> */}
                        {menu}
                    </div>
                </div>
                {/* { this.state.openLists && <Lists lists={this.state.lists} discardReport={this.discardReport}/> } 
                { this.state.openHistory && <ReportHistory reports={this.state.reports}/> }  */}
                <ReportMain problem={this.state.actualProblem}/>
            </div>
        </div>
       )
    }
}

export default ReportPage;
