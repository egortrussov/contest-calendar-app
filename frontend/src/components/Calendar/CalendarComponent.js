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
        let { monthsData } = this.props;

        return (
            <div className="calendar">
                {
                    monthsData.map((monthData, inx) => (
                        <MonthCard
                            monthData={ monthData }
                            monthName={ monthNames[inx] }
                            month={ inx }
                        />
                    ))
                }
            </div>
        )
    }
}
