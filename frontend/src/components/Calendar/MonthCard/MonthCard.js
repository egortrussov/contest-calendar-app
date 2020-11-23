import React, { Component } from 'react'
import DayNode from './DayNode';

export default class MonthCard extends Component {

    chooseMonth() {
        const { day, month, year } = this.props.currentDate;

        this.props.setCurrentDate({
            day,
            month: this.props.monthInx + 1,
            year
        })
        this.props.setSearchType('month');
    }

    changeDate(day) {
        const { year } = this.props.currentDate;

        this.props.setCurrentDate({
            day,
            month: this.props.monthInx + 1,
            year
        })

        this.props.setSearchType('day')
    }

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
            let isChosen = false;
            // if (monthInx === 9)
            // console.log(todaysDate.month - 1,  monthInx,  todaysDate.day === i + 1)

            if (currentDate.year === todaysDate.year && todaysDate.month === monthInx + 1 && todaysDate.day === i + 1) 
                isActive = true;
            
            if (currentDate.month === monthInx + 1 && currentDate.day === i + 1) 
                isChosen = true;

            days.push((
                <DayNode
                    day={ (i + 1).toString() }
                    state=""
                    isCurrent={ isActive }
                    isChosen={ isChosen }
                    setCurrentDate={ () => this.changeDate(i + 1) }
                />
            ))
        }
        
        let currClassName = isCurrent ? 'active' : '';

        return (
            <div className={ "month-card " + currClassName }>
                <div className="top" onClick={ () => this.chooseMonth() }>
                    { monthName }
                </div>
                <div className="bottom">
                    { days }
                </div>
            </div>
        )
    }
}
