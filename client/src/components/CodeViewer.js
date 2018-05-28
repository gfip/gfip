import React, { Component } from 'react'; 
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/styles/hljs';
import sad_face from '../assets/img/sad_face.png';
import {Label} from 'semantic-ui-react'

class CodeViewer extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        let code = this.props.problem.code;
        let evaluation = this.props.problem.evaluation;
        return (
            <div className="container column centered report_main">
                <div className='container row report_label'>
                    {(evaluation === 'WRONG_ANSWER' || evaluation === 'EMPTY_ANSWER') && code && <Label as='a' color='red'>Wrong solution</Label>}
                    {evaluation === 'CORRECT' && code && <Label as='a' color='green'>Correct answer</Label>}
                </div>
                {evaluation !== 'EMPTY' && code && <SyntaxHighlighter showLineNumbers className='report_code' language='java' style={xcode}>{String(code)}</SyntaxHighlighter>}
                {evaluation === 'EMPTY' && <img className='report_sadface' src={sad_face} alt='sad face'/>}
                {evaluation === 'EMPTY' && <h2 className='text-center'>The student didn't do this exercise.</h2>}
            </div>
       )
    }
}

export default CodeViewer;
