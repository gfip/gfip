import React, { Component } from 'react'; 
import { ListCard } from './';
import { orderBy } from 'lodash';
import { discardListReport } from '../helpers/api';

class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
            discardEnabled: true
        }
        this.discardReport = this.discardReport.bind(this);
    }

    discardReport = async event => {
        event.preventDefault();
        console.log("ok")
        try {
            if(this.state.discardEnabled) {
                this.setState({discardEnabled: false});
                console.log(this.props.auth);
                console.log(this.props.studentid);
                console.log(event.target.dataset.id);
                await discardListReport(this.props.auth, this.props.studentid, event.target.dataset.id); 
            }
        } catch (err) {
            this.setState({discardEnabled: true});
            console.log(err.message);
        }
    }

    render() {
        let listsCards = orderBy(this.props.lists, ['endDate', 'title'], ['asc', 'asc']);
        listsCards = listsCards.map((list) => {
            return <ListCard key={list._id} list={list} discardReport={this.discardReport}/>
        })

        return (
            <div className="container column">
                <h1 style={{"textAlign":"center"}} id="show_student_title">PENDING REPORTS</h1>
                <div id="show_student_hr"></div>
                {listsCards}
            </div>
       )
    }
}

export default Lists;
