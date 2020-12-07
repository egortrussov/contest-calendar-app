import React, { Component } from 'react'

import './css/style.css'

export default class PassedContestFilter extends Component {
    render() {

        const { isSelected } = this.props; 

        return (
            <div className="filter-block">
                <input type="checkbox" checked={ isSelected } onChange={ () => this.props.onChange() } name="" id=""/>
                <div className="label">
                    Show passed contests
                </div>
            </div>
        )
    }
}
