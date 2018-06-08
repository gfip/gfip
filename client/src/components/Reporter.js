import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { Form, Dropdown, Button, Icon, TextArea} from 'semantic-ui-react';

class Reporter extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            scores: [],
            custom: [],
            finalComment: '',
            sendDisable: false
        }
    
        this.focusRef = [];
        
        this.sendEmail = this.sendEmail.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleFinalComment = this.handleFinalComment.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.setStateArrayValue = this.setStateArrayValue.bind(this);
    }

    componentDidMount(){
        this.focusRef.forEach(input => {
            if(input && this.props.actualProblem === Number(input.name)) input.focus()
        });

        this.props.problems.forEach((problem, index) => {
            let defaultValue = problem.evaluation === 'CORRECT' ? problem.problem.score : 0;
            this.setStateArrayValue('scores', index, defaultValue);
        });
    }

    handleComment(event){
       this.setStateArrayValue('comments', event.target.name, event.target.value);
    }

    handleScore(event){
        this.setStateArrayValue('scores', event.target.name, Number(event.target.value));
    }
    
    handleDropdown(event, data){
        let custom = data.value === 'custom';
        this.setStateArrayValue('custom', data.name, custom);
        if(!custom){
            this.setStateArrayValue('scores', data.name, data.value);
        }
    }

    setStateArrayValue(collection, index, value){
        let news = this.state[collection];
        news[Number(index)] = value;
        console.log(news);
        this.setState({[collection]: news});
    }

    handleFinalComment(event){
        this.setState({
            finalComment: event.target.value
        })
    }

    sendEmail(event){
        this.props.sendEmail(event, this.state.comments, this.state.scores, this.state.finalComment);
    }


    render() {
        let obj = this;
        let fields = this.props.problems.map((problem, index) => {
            let options = [ {text: <img alt='done' src='/checked.png'/>, value: problem.problem.score}, 
                            {text: <img alt='medium' src='/aprox.png'/>, value: 'custom'},
                            {text: <img alt='didnot' src='/close-button.png'/>, value: 0}
                        ]
            let defaultValue = problem.evaluation === 'CORRECT' ? problem.problem.score : 0;
            let scoreDisplay = obj.state.custom[index] ? 'block' : 'none';
            return <Form.Field 
                    className="container row report_formfield" 
                    key={problem.problem.theHuxleyId}>
                        <Dropdown 
                            className='report_dropdown' 
                            compact 
                            name={index} 
                            onChange={(e, data) => obj.handleDropdown(e, data)} 
                            selection 
                            defaultValue={defaultValue}
                            options={options}/>
                        <input
                            className='report_score' 
                            type='number'
                            min='0'
                            max={problem.problem.score}
                            style={{display: scoreDisplay}}
                            defaultValue={defaultValue}
                            onChange={obj.handleScore}
                            name={index}/>
                        <input 
                            ref={(input) => this.focusRef.push(input)} 
                            name={index}
                            onChange={obj.handleComment} 
                            placeholder={`Comments about ${problem.problem.name}`}/>
                    </Form.Field>
        })
        return (
            <div className="report_reporter_wrapper">
                <div className="report_reporter">
                    <Form className='container column centered report_form'>
                        {fields}
                        <Form.Field className="report_formfield">
                            {this.props.list.student && <TextArea 
                                id='textarea' 
                                onChange={this.handleFinalComment.bind(this)} 
                                placeholder={`Geral comments about ${this.props.list.student.name}'s submissions for ${this.props.list.list.title}`}/>}
                        </Form.Field>
                    </Form>    
                </div>
                {!this.props.sent && <Button 
                        disabled={this.props.sendDisabled} 
                        loading={this.props.sendDisabled} 
                        onClick={this.sendEmail.bind(this)} 
                        id="report_send_btn" 
                        type='submit'> <Icon name='send outline'/>Send
                    </Button>}
            </div>
       )
    }
}

Reporter.propTypes = {
    sendEmail: PropTypes.func,
    actualProblem: PropTypes.number,
    problems: PropTypes.array,
    list: PropTypes.object,
    sent: PropTypes.bool,
    sendDisabled: PropTypes.bool
}

export default Reporter;
