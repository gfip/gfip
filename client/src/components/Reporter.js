import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { Form, Dropdown, Button, Icon, TextArea} from 'semantic-ui-react';

class Reporter extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            finalComment: '',
            sendDisable: false
        }
        this.focusRef = [];
    }

    handleComment(event, type, data){
        let newComments = this.state.comments;
        let destiny = type === "eval" ? Number(data.name) : Number(event.target.name);
        let changing = newComments[destiny]
        let value = type === "eval" ? data.value : event.target.value;
        if(changing){
            newComments[destiny][type] = value;
        } else{
            let valueObj = {} 
            valueObj[type] = value;
            newComments[destiny] = valueObj;
        }

        this.setState({comments: newComments});
    }

    handleFinalComment(event){
        this.setState({
            finalComment: event.target.value
        })
    }

    sendEmail(event){
        let comments = this.state.comments.map((comment) => {
            if(!comment.eval) comment.eval = '';
            return comment.eval + comment.comment
        })
        this.props.sendEmail(event, comments, this.state.finalComment);
    }

    componentDidMount(){
        this.focusRef.forEach(input => {
            if(input && this.props.actualProblem === Number(input.name)) input.focus()
        });
    }

    render() {
        let obj = this;
        let options = [ {text: <img alt='excelent' src='/happy.png'/>, value: 'Excelente. '}, 
                        {text: <img alt='medium' src='/medium.png'/>, value: 'Razoável. '},
                        {text: <img alt='bad' src='/sad.png'/>, value: 'Ruim. '}
                    ]
        let fields = this.props.problems.map((problem, index) => {
            return <Form.Field className="container row report_formfield" key={problem.problem.theHuxleyId}>
                        <Dropdown className='report_dropdown' compact name={index} onChange={(e, data) => obj.handleComment(e, 'eval', data)} selection options={options}/>
                        <input ref={(input) => this.focusRef.push(input)} name={index} onChange={(e) => obj.handleComment(e, 'comment')} placeholder={`Comments about ${problem.problem.name}`}/>
                    </Form.Field>
        })
        return (
            <div className="report_reporter_wrapper">
                <div className="report_reporter">
                    <Form className='container column centered report_form'>
                        {fields}
                        <Form.Field className="report_formfield">
                            {this.props.list.student && <TextArea id='textarea' onChange={this.handleFinalComment.bind(this)} placeholder={`Geral comments about ${this.props.list.student.name}'s submissions for ${this.props.list.list.title}`}/>}
                        </Form.Field>
                    </Form>    
                </div>
                {!this.props.sent && <Button disabled={this.props.sendDisabled} loading={this.props.sendDisabled} onClick={this.sendEmail.bind(this)} id="report_send_btn" type='submit'><Icon name='send outline'/>Send</Button>}
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
