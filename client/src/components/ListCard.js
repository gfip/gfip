import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import '../assets/navbar.css';

class ListCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            discardEnabled: true
        };
    }

    render() {
        let days = moment(this.props.list.endDate).fromNow();
        return (
            <a
                data-id={this.props.list._id}
                className="show_student_listCard"
                href={`${this.props.student_id}/lists/` + this.props.list._id}>
                <Icon
                    data-id={this.props.list._id}
                    className="show_student_list_delete"
                    onClick={this.props.discardReport}
                    name="times rectangle"/>
                <div className="container column centered">
                    <b>
                        <h3>{this.props.list.title}</h3>
                    </b>
                    <em>
                        <h5
                            style={{
                            marginTop: 0
                        }}>{'Expired ' + days}</h5>
                    </em>
                </div>
            </a>
        );
    }
}

ListCard.propTypes = {
    list: PropTypes.object,
    student_id: PropTypes.string,
    discardReport: PropTypes.func
}

export default ListCard;
