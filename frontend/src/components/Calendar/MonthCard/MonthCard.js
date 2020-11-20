import React, { Component } from 'react'
import DayNode from './DayNode';

export default class MonthCard extends Component {
    render() {

        const { monthData, monthName, monthInx } = this.props;

        let days = [];

        for (let i = 0; i < monthData.missedDays; i++) 
            days.push((
                <DayNode
                    day={ '' }
                    state="disabled"
                />
            ))

        for (let i = 0; i < monthData.days; i++) 
            days.push((
                <DayNode
                    day={ (i + 1).toString() }
                    state=""
                />
            ))

        return (
            <div className="month-card">
                <div className="top">
                    { monthName }
                </div>
                <div className="bottom">
                    { days }
                </div>
            </div>
        )
    }
}
