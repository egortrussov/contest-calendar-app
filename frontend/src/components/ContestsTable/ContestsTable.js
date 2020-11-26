import React, { Component } from 'react'

import './css/style.css'

export default class ContestsTable extends Component {
    render() {

        const { contests, type } = this.props;

        if (type === 'full')

        return (
            <div className="contests-table">
                <div className="row head">
                    <div className="cell">
                        Name
                    </div>
                    <div className="cell">
                        Grade
                    </div>
                    <div className="cell">
                        Subject
                    </div>
                </div>
            </div>
        )
    }
}
