import React, { Component } from 'react'

import './css/style.css'
import MonthCard from './MonthCard/MonthCard';

export default class CalendarComponent extends Component {
 
    state = {
        monthNames: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]
    }

    render() {

        const { monthNames } = this.state;
        let { monthsData, currentDate, todaysDate } = this.props;

        return (
            <div className="calendar">
                {
                    monthsData.map((monthData, inx) =>{
                        let isCurrent = false;

                        if (currentDate.year === todaysDate.year && todaysDate.month === inx) 
                            isCurrent = true;

                        return (
                            <MonthCard
                                monthData={ monthData }
                                monthName={ monthNames[inx] }
                                monthInx={ inx }
                                isCurrent={ isCurrent }
                                todaysDate={ todaysDate }
                                currentDate={ currentDate }
                            />
                        )
                    } )
                }
            </div>
        )
    }
}
