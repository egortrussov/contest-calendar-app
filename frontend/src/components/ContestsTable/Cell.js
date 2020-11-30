import React, { Component } from 'react'

export default class Cell extends Component {
    render() {

        const { text, extraClassName } = this.props;

        return (
            <div className={ "cell " + extraClassName }>
                { text }
            </div>
        )
    }
}
