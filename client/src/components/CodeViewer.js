import React, { Component } from 'react'; 
import Highlight from 'react-highlight';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/styles/hljs';
class ReportMain extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        let code = this.props.problem.code;
        console.log(this.props.problem)
        return (
            <div className="container column centered report_main">
                {this.props.problem.evaluation !== 'EMPTY' && code && <SyntaxHighlighter showLineNumbers className='report_code' style={xcode}>{String(code)}</SyntaxHighlighter>}
                {this.props.problem.evaluation === 'EMPTY' && <img src=''/>}
            </div>
       )
    }
}

export default ReportMain;
