import React, { Component } from 'react'
import DayNode from './DayNode';

export default class MonthCard extends Component {
    render() {

        const { monthData, monthName, monthInx, isCurrent, currentDate, todaysDate } = this.props;

        let days = [];

        for (let i = 0; i < monthData.missedDays; i++) 
            days.push((
                <DayNode
                    day={ '' }
                    state="disabled"
                />
            ))

        for (let i = 0; i < monthData.days; i++) {
            let isActive = false;
            if (monthInx === 9)
            console.log(todaysDate.month - 1,  monthInx,  todaysDate.day === i + 1)

            if (currentDate.year === todaysDate.year && todaysDate.month === monthInx && todaysDate.day === i + 1) 
                isActive = true;

            days.push((
                <DayNode
                    day={ (i + 1).toString() }
                    state=""
                    isCurrent={ isActive }
                />
            ))
        }
        
        let currClassName = isCurrent ? 'active' : '';

        return (
            <div className={ "month-card " + currClassName }>
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
