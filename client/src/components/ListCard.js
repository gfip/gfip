import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import '../assets/navbar.css';
import moment from 'moment';
class listCard extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            discardEnabled: true
        };
    }

    render() {
        let days = moment().diff(moment(this.props.list.endDate), 'days');
        return (
            <a data-id={this.props.list._id} className="show_student_listCard" href={`${this.props.student_id}/lists/` + this.props.list._id}>
                <Icon data-id={this.props.list._id} className="show_student_list_delete" onClick={this.props.discardReport} name="times rectangle" />
                <div className="container column centered">
                    <b><h3>{this.props.list.title}</h3></b>
                    <em><h5 style={{marginTop: 0}}>{'Expired ' + days + ' days ago'}</h5></em>
                </div>
            </a>
        );
  }
}

export default listCard;
