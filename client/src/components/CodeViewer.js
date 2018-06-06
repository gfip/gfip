import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import {Label} from 'semantic-ui-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/styles/hljs';
import sad_face from '../assets/img/sad_face.png';

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
            <div className="container column centered report_code_wrapper">
                <div className='container row report_label'>
                {code && <Label as='a' color='blue'>{this.props.problem.tries} submissions</Label>}
                {
                    (() => {
                        let tags = [];
                        if(evaluation === 'TIME_LIMIT_EXCEEDED'){
                            tags.push(<Label key='tle' as='a' color='yellow'>TLE</Label>);
                            tags.push(<Label key='wa' as='a' color='red'>Wrong solution</Label>);
                        } else if(evaluation === 'RUNTIME_ERROR')
                            tags.push(<Label key='rte' as='a' color='red'>Runtime error</Label>);
                        else if(evaluation === 'WRONG_ANSWER' || evaluation === 'EMPTY_ANSWER')
                            tags.push(<Label key='wa' as='a' color='red'>Wrong solution</Label>);
                        else if(evaluation === 'CORRECT')
                            tags.push(<Label key='ca' as='a' color='green'>Correct answer</Label>);
                        else if(evaluation === 'COMPILATION_ERROR')
                            tags.push(<Label key='ce' as='a' color='red'>Compilation error</Label>);
                        return (tags);
                    })()
                }
                </div>
                {
                    (() => {
                        if(evaluation === 'EMPTY'){
                            return ([<img key='sad-face' className='report_sadface' src={sad_face} alt='sad face'/>,
                                    <h2 key='text' className='text-center'> The student didn&apos;t do this exercise. </h2>])
                        } else if(code){
                            return <SyntaxHighlighter 
                                        showLineNumbers 
                                        className='report_code' 
                                        language='java' 
                                        style={xcode}>{String(code)}
                                    </SyntaxHighlighter>;
                        }
                    })()
                }
            </div>
       )
    }
}

CodeViewer.propTypes = {
    problem: PropTypes.object
}

export default CodeViewer;
