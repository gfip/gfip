import React, { Component } from 'react'; 
import '../assets/report.css';
import { getListInfo } from '../helpers/api';
import { Navbar, MenuBlock, InfoBlock, CodeViewer, Reporter} from '../components';
import { Button, Icon } from 'semantic-ui-react';
class ReportPage extends Component {    
    constructor(props){
        super(props);
        this.state = {
            list: { submissions: []},
            actualProblem: {},
            problems: {},
            openReporter: false,
        }
       
    }
    
    async componentDidMount(){
        try{
            let listInfo = await getListInfo(this.props.auth, this.props.match.params.student_id, this.props.match.params.list_id);
            let firstProblem = listInfo.data.submissions[0];
            this.setState({list: listInfo.data, actualProblem: firstProblem, problems: {[firstProblem.problem.theHuxleyId]: true}});
        } catch (err){
            console.log(err.message);
        }
    }

    render() {
        let obj = this;
        let totalScore = 0; 
        var menu = this.state.list.submissions.map((prob) => {
            let callback = function() {
                let newState = {problems:{}};
                newState.problems[prob.problem.theHuxleyId] = true;
                newState['actualProblem'] = prob;
                for(var key in obj.state){
                    if(obj.state.problems[key] === true){
                        newState.problems[key] = false;
                    }
                }
                obj.setState(newState);
            }
            if(prob.evaluation === "CORRECT") totalScore+= prob.problem.score;
            prob.problem.name = prob.problem.name.substring(0,30);
            return <MenuBlock key={prob.problem.theHuxleyId} callback={callback} title={prob.problem.name} active={this.state.problems[prob.problem.theHuxleyId]}/>
        })

        let code_btn_class = this.state.openReporter ? 'grey' : 'black'
        let reporter_btn_class = this.state.openReporter ? 'black' : 'grey'

        return (
        <div className="container column centered">
            <Navbar user={this.props.user}/>
            <div className='container report_all centered'>
                <div className="container column">
                    <Button.Group className='report_btn_group'>
                        <Button color={code_btn_class} onClick={(e) => this.setState(({openReporter: false}))}><Icon name='code'/>Code</Button>
                        <Button color={reporter_btn_class} onClick={(e) => this.setState(({openReporter: true}))}><Icon name='content'/>Reporter</Button>
                    </Button.Group>
                    { this.state.list.student && <InfoBlock class='report_infoBlock' title={this.state.list.student.name} subtitle={`Score: ${totalScore}/${this.state.list.list.totalScore}`}/> }
                    { this.state.list.student && <InfoBlock class='report_infoBlock' title={this.state.list.list.title} subtitle={''}/> }
                    {menu}
                </div>
                {!this.state.openReporter && <CodeViewer problem={this.state.actualProblem}/>}
                { this.state.openReporter && <Reporter></Reporter>}
            </div>
        </div>
       )
    }
}

export default ReportPage;
