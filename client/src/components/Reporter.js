import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { Form, Dropdown, Button, Icon } from 'semantic-ui-react';
import TextareaAutosize from 'react-autosize-textarea';

class Reporter extends Component {
    render() {
        let obj = this;
        let fields = this.props.problems.map((problem, index) => {
            let DropdownOptions = [ {text: <img alt='done' src='/checked.png'/>, value: problem.problem.score}, 
                            {text: <img alt='medium' src='/aprox.png'/>, value: 'custom'},
                            {text: <img alt='didnot' src='/close-button.png'/>, value: 0}
                        ]
            
            let defaultValue = obj.props.scores[index]
            let scoreDisplay = 'none';
            
            if(obj.props.custom[index]){
                defaultValue = 'custom'
                scoreDisplay = 'block'
            }
            
            return <Form.Field 
                    className="container row report_formfield" 
                    key={problem.problem.theHuxleyId}>
                        <Dropdown 
                            className='report_dropdown' 
                            name={index} 
                            selection
                            compact
                            onChange={(e, data) => obj.props.handleDropdown(e, data)} 
                            defaultValue={defaultValue}
                            options={DropdownOptions}/>
                        <input
                            className='report_score' 
                            type='number'
                            min='0'
                            max={problem.problem.score}
                            style={{display: scoreDisplay}}
                            defaultValue={obj.props.scores[index]}
                            onChange={obj.props.handleScore}
                            name={index}/>
                        <TextareaAutosize
                            rows={1}
                            name={index}
                            defaultValue={obj.props.comments[index] || ''}
                            onChange={obj.props.handleComment} 
                            placeholder={`Comments about ${problem.problem.name}`}/>
                    </Form.Field>
        })
        return (
            <div className="report_reporter_wrapper">
                <div className="report_reporter">
                    <Form className='container column centered report_form'>
                        {fields}
                        <Form.Field className="report_formfield">
                            {this.props.list.student && <TextareaAutosize
                                rows={3}
                                id='textarea' 
                                onChange={this.props.handleFinalComment} 
                                defaultValue={this.props.finalComment || ''}
                                placeholder={`Geral comments about ${this.props.list.student.name}'s submissions for ${this.props.list.list.title}`}/>}
                        </Form.Field>
                    </Form>    
                </div>
                {!this.props.sent && <Button 
                        disabled={this.props.sendDisabled} 
                        loading={this.props.sendDisabled} 
                        onClick={this.props.sendEmail} 
                        id="report_send_btn" 
                        type='submit'> <Icon name='send outline'/>Send
                    </Button>}
            </div>
       )
    }
}

Reporter.propTypes = {
    sendEmail: PropTypes.func,
    handleFinalComment: PropTypes.func,
    handleScore: PropTypes.func,
    handleDropdown: PropTypes.func,
    handleComment: PropTypes.func,
    problems: PropTypes.array,
    custom: PropTypes.array,
    comments: PropTypes.array,
    finalComment: PropTypes.string,
    list: PropTypes.object,
    sent: PropTypes.bool,
    sendDisabled: PropTypes.bool
}

export default Reporter;
