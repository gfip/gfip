import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../assets/report.css';
import {getListInfo, sendReport} from '../helpers/api';
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
            sentEmail: false
        }

        this.sendEmail = this.sendEmail.bind(this);
    }

    async componentDidMount() {
        try {
            let listInfo = await getListInfo(this.props.auth, this.props.match.params.student_id, this.props.match.params.list_id);
            let firstProblem = listInfo.data.submissions[0];
            this.setState({
                list: listInfo.data,
                actualProblem: firstProblem,
                problems: {
                    [firstProblem.problem.theHuxleyId]: true
                }
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    async sendEmail(event, comments, finalComment) {
        try {
            this.setState({sendDisabled: true});
            await sendReport(this.props.auth, this.props.match.params.student_id, this.props.match.params.list_id, comments, finalComment);
            this.setState({sentEmail: true});
        } catch (err) {
            this.setState({sendDisabled: false});
        }
    }
    render() {
        let obj = this;
        let totalScore = 0;
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
                if (prob.evaluation === "CORRECT") 
                    totalScore += prob.problem.score;
                prob.problem.name = prob
                    .problem
                    .name
                    .substring(0, 30);
                return <MenuBlock
                    key={prob.problem.theHuxleyId}
                    callback={callback}
                    title={prob.problem.name}
                    active={this.state.problems[prob.problem.theHuxleyId]}/>
            }
        )

        let code_btn_class = this.state.openReporter ? 'grey' : 'black'
        let reporter_btn_class = this.state.openReporter ? 'black' : 'grey'

        let problemIndex = this.state.list.submissions.indexOf(this.state.actualProblem); //passing to <reporter> so it can focus the right input
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
                            subtitle={`Score: ${totalScore}/${this.state.list.list.totalScore}`}/>}
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
                        actualProblem={problemIndex}
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
