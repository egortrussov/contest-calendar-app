import React, { Component } from 'react'

import Spinner from './Spinner'

export default class Button extends Component {
    render() {

        const { text, type, isLoading } = this.props;

        return (
            <button className={ `button ${ type } ${ isLoading ? 'disabled' : '' }` } onClick={ !isLoading ?  () => this.props.onClick() : false }>
                {
                    isLoading ? (
                        <Spinner 
                            size="xsm"
                            isWhite={ type == "cta" }
                        />
                    ) : (
                        <span>
                            { text }
                        </span>
                    )
                }
            </button>
        )
    }
}
