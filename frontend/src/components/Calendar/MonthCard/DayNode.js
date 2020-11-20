import React, { Component } from 'react'

export default class DayNode extends Component {
    render() {

        const { state, day } = this.props;

        return (
            <div className={ `day-node ${ state }` }>
                { day }
            </div>
        )
    }
}
