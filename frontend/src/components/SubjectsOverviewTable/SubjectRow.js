import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class SubjectRow extends Component {
    render() {

        const { subject } = this.props;

        return (
            <div className="row">
                <div className="cell">
                    { subject.name }
                </div>
                <div className="cell small">
                    <FontAwesomeIcon
                        className="icon"
                        icon={ faPen }
                    />
                </div>
                <div className="cell small">
                    <FontAwesomeIcon
                        className="icon"
                        icon={ faTimes }
                    />
                </div>
            </div>
        )
    }
}
