import React, { Component } from 'react'; 
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { ListCard } from './';

class Lists extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        let listsCards = orderBy(this.props.lists, ['endDate', 'title'], ['asc', 'asc']);
        listsCards = listsCards.map((list) => {
            return <ListCard key={list._id} list={list} discardReport={this.props.discardReport} student_id={this.props.student_id}/>
        })

        return (
            <div className="container column centered">
                <h1 id="show_student_title">PENDING REPORTS</h1>
                <div id="show_student_hr"></div>
                {listsCards}
            </div>
       )
    }
}

Lists.propTypes = {
    lists: PropTypes.array,
    discardReport: PropTypes.func,
    student_id: PropTypes.string
}

export default Lists;
