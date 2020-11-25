import React, { Component } from 'react'

import './css/style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class ContestsDisplayModal extends Component {

    state = {
        isExtended: false
    }

    toggleExtendedState() {
        this.setState({
            isExtended: !this.state.isExtended
        })
    }

    render() {

        const { isExtended } = this.state;

        const { isHidden } = this.props;

        return (
            <div className={ `display-modal ${ isExtended ? 'extended' : '' } ${ isHidden ? 'hidden' : '' }` }>
                <div className="content">
                    <div className="handlers">
                        <div 
                            className={ `handler-btn ${ isExtended ? 'active' : '' }` }
                            onClick={ () => this.toggleExtendedState() }
                        >
                            <FontAwesomeIcon
                                icon={ faArrowUp }
                                className="icon"
                            />
                        </div>
                        <div className="handler-btn" onClick={ () => this.props.closeModal() }>
                            <FontAwesomeIcon
                                icon={ faTimes }
                            />
                        </div>
                    </div>
                </div>
                rf
            </div>
        )
    }
}
