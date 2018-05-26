import React, { Component } from 'react'; 
import { ListCard } from './';
import { orderBy } from 'lodash';

class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        let listsCards = orderBy(this.props.lists, ['endDate', 'title'], ['asc', 'asc']);
        listsCards = listsCards.map((list) => {
            return <ListCard key={list._id} list={list} discardReport={this.props.discardReport}/>
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
