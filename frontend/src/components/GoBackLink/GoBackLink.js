import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import './css/style.css'

export default class GoBackLink extends Component {
    render() {

        let { label, link } = this.props;

        return (
            <Link to={ link } className="go-back-link">
                <FontAwesomeIcon
                    className="icon"
                    icon={ faArrowLeft }
                />
                <div className="label">
                    { label }
                </div>
            </Link>
        )
    }
}
