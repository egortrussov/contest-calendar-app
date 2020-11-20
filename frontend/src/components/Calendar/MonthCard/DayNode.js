import React, { Component } from 'react'

export default class DayNode extends Component {
    render() {

        const { state, day, isCurrent } = this.props;

        let isActive = isCurrent ? 'active' : ''

        return (
            <div className={ `day-node ${ state } ${ isActive }` }>
                { day }
            </div>
        )
    }
}
