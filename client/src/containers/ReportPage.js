import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../assets/report.css';
import {getListInfo, sendReport, showReport, saveReport} from '../helpers/api';
import {Navbar, MenuBlock, InfoBlock, CodeViewer, Reporter} from '../components';

class ReportPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                submissions: []
            },
            actualProblem: {},
            problems: {},
            openReporter: false,
            sendDisabled: false,
            sentEmail: false,
            comments: [],
            scores: [],
            custom: [],
            finalComment: '',
            sendDisable: false,
            totalScore: 0,
            reportIsDirty: false
        }
    }

    componentDidMount = async () => {
        try {
            let report = await showReport(this.props.auth, this.props.match.params.student_id, this.props.match.params.list_id);
            let listInfo = await getListInfo(this.props.auth, this.props.match.params.student_id, this.props.match.params.list_id);
            let firstProblem = listInfo.data.submissions[0];
            report = report.data;
            let comments = report.submissions.map((subm) => subm.comment);

            this.setState({finalComment: report.finalComment, comments: comments});
            
            await this.setState({
                list: listInfo.data,
                actualProblem: firstProblem,
                problems: {
                    [firstProblem.problem.theHuxleyId]: true
                }
            });

            report.submissions.forEach((submission, index) => {
                let defaultValue = submission.problem.score;
                this.setState({totalScore: this.state.totalScore += defaultValue});
                this.setStateArrayValue('scores', index, defaultValue);
            });

            setInterval(() => {
                this.saveReportCall();
            }, 1500)
        } catch (err) {
            console.log(err.message);
        }
    }

    sendEmail = async () => {
        try {
            this.setState({sendDisabled: true});
            await sendReport(this.props.auth, this.props.match.params.student_id, 
                            this.props.match.params.list_id, this.state.comments, 
                            this.state.scores, this.state.finalComment);
            this.setState({sentEmail: true});
        } catch (err) {
            console.log(err);
            this.setState({sendDisabled: false});
        }
    }

    handleComment = (event) => {
        this.setStateArrayValue('comments', event.target.name, event.target.value);
        this.setReportDirty();
    }
 
    handleScore = (event) => {
        let problem = this.state.list.submissions[Number(event.target.name)]
        
        if(event.target.value > problem.problem.maxScore){
            event.target.value = problem.problem.maxScore;
        } else if (event.target.value < 0){
            event.target.value = 0;
        }
        
        this.setStateArrayValue('scores', event.target.name, Number(event.target.value));
        this.calculateNewScore();
        this.setReportDirty();
    }
     
     handleDropdown = async (event, data) => {
         let custom = data.value === 'custom';
         this.setStateArrayValue('custom', data.name, custom);
         if(!custom){
            await this.setStateArrayValue('scores', data.name, data.value);
            this.calculateNewScore();
        }
        this.setReportDirty();
    }

    calculateNewScore(){
        let newScore = this.state.scores.reduce( (accum, curr) => accum + curr );
        this.setState({totalScore: newScore});
    }
 
    handleFinalComment = (event) =>{
         this.setState({
             finalComment: event.target.value
         })
         this.setReportDirty();
     }

    setStateArrayValue = async (collection, index, value) => {
        let news = this.state[collection];
        news[Number(index)] = value;
        await this.setState({[collection]: news});
    }

    setReportDirty = () => {
        this.setState({reportIsDirty: true});
    }

    saveReportCall = async () => {
        try{
            if (this.state.reportIsDirty){
                await saveReport(this.props.auth, this.props.match.params.student_id, this.props.match.params.list_id, this.state.comments, this.state.scores, this.state.finalComment);
                this.setState({reportIsDirty: false});
            } 
        } catch (err) {
            console.log(err);   
        }
    }

    render() {
        let obj = this;
        var menu = this.state.list.submissions.map(
            (prob) => {
                let callback = function () {
                    let newState = {
                        problems: {}
                    };
                    newState.problems[prob.problem.theHuxleyId] = true;
                    newState['actualProblem'] = prob;
                    for (var key in obj.state) {
                        if (obj.state.problems[key] === true) {
                            newState.problems[key] = false;
                        }
                    }
                    obj.setState(newState);
                }
                
                prob.problem.name = prob.problem.name.substring(0, 30);
                
                return <MenuBlock
                    key={prob.problem.theHuxleyId}
                    callback={callback}
                    title={prob.problem.name}
                    active={this.state.problems[prob.problem.theHuxleyId]}/>
            }
        )

        let code_btn_class = this.state.openReporter ? 'grey' : 'black'
        let reporter_btn_class = this.state.openReporter ? 'black' : 'grey'
        
        return (
            <div className="container column centered">
                <Navbar user={this.props.user}/>
                <div className='container report_all centered'>
                    <div className="container column">
                        {this.state.list.student && <Button.Group className='report_btn_group'>
                            <Button
                                color={code_btn_class}
                                onClick={() => this.setState(({openReporter: false}))}><Icon name='code'/>Code</Button>
                            <Button
                                color={reporter_btn_class}
                                onClick={() => this.setState(({openReporter: true}))}><Icon name='content'/>Reporter</Button>
                        </Button.Group>}
                        {this.state.list.student && <InfoBlock
                            className='report_infoBlock'
                            title={this.state.list.student.name}
                            subtitle={`Score: ${this.state.totalScore}/${this.state.list.list.totalScore}`}/>}
                        {this.state.list.student && <InfoBlock
                            className='report_infoBlock'
                            title={this.state.list.list.title}
                            subtitle={''}/>}
                        {menu}
                    </div>
                    {!this.state.openReporter && <CodeViewer problem={this.state.actualProblem}/>}
                    {this.state.openReporter && <Reporter
                        sent={this.state.sentEmail}
                        sendDisabled={this.state.sendDisabled}
                        sendEmail={this.sendEmail}
                        list={this.state.list}
                        handleComment={this.handleComment}
                        handleDropdown={this.handleDropdown}
                        handleScore={this.handleScore}
                        handleFinalComment={this.handleFinalComment}
                        custom={this.state.custom}
                        comments={this.state.comments}
                        finalComment={this.state.finalComment}
                        scores={this.state.scores}
                        reportIsDirty={this.state.reportIsDirty}
                        problems={this.state.list.submissions}></Reporter>}
                </div>
            </div>
        )
    }
}

ReportPage.propTypes = {
    auth: PropTypes.string,
    match: PropTypes.object,
    user: PropTypes.object
}

export default ReportPage;