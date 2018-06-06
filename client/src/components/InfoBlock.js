import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../assets/show_student.css';

class InfoBlock extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={"container column centered " + this.props.className}>
                <b>
                    <h3>
                        {this.props.title}
                    </h3>
                </b>
                <em>
                    <h5>
                        {this.props.subtitle}
                    </h5>
                </em>
            </div>
        );
    }
}

InfoBlock.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string
}

export default InfoBlock;
