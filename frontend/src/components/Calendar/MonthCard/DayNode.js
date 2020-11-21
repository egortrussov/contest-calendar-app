import React, { Component } from 'react'

export default class DayNode extends Component {
    render() {

        const { state, day, isCurrent, isChosen } = this.props;

        let isActive = isCurrent ? 'active' : ''
        let isHighlighted = isChosen ? 'highlighted' : ''

        return (
            <div className={ `day-node ${ state } ${ isActive } ${ isHighlighted }` } onClick={ () => this.props.setCurrentDate() }>
                { day }
            </div>
        )
    }
}
