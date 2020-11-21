import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Heading from '../../../components/ReusableComponents/Heading'
import CalendarComponent from '../../../components/Calendar/CalendarComponent'

import { AuthContext } from '../../../Context/AuthContext'

import { formatDate } from '../../../middleware/dateFromat';

import './css/style.css'

export default class Calendar extends Component {

    state = {
        todaysDate: {
            day: null,
            month: null,
            year: null
        },
        currentDate: {
            day: null,
            month: null,
            year: null
        },
        monthsData: [],
        isRedirectToLogin: false,
        searchType: null
    }

    static contextType = AuthContext;

    checkAuth() {
        if (!this.context.token) {
            this.setState({
                isRedirectToLogin: true
            })
            return;
        }
    }
    

    componentDidMount() {

        // this.checkAuth()

        let date = new Date();

        let currentDate = {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }

        this.setState({
            currentDate,
            todaysDate: currentDate
        }, () => {
            this.calculateMonthDays()
        })
    }

    calculateMonthDays() {
        const { currentDate } = this.state;

        let monthsData = [];

        for (let m = 0; m < 12; m++) {
            let date = new Date(currentDate.year, m + 1, 0).getDate();
            let startsOn = new Date(currentDate.year, m, 1).getDay();
            startsOn--;
            if (startsOn < 0) startsOn = 6;

            monthsData.push({
                days: date,
                missedDays: startsOn
            })
        }
        console.log(monthsData)

        this.setState({
            monthsData
        })
    }

    changeYear(val) {
        let { currentDate } = this.state;
        let { year } = currentDate;

        year += val;

        if (year > 1970 && year < 2100) {
            currentDate.year = year;
            this.setState({
                currentDate
            }, () => this.calculateMonthDays())
        }
    }

    setCurrentDate(date) {
        console.log(date)
        this.setState({
            currentDate: date
        })
    }

    setSearchType(type) {
        this.setState({
            searchType: type
        })
    }

    render() {

        const { currentDate, monthsData, todaysDate, isRedirectToLogin } = this.state;

        if (!this.context.token) {
            this.context.logout();
            return (
                <>
                    <Redirect 
                        to="/app/login"
                    />
                </>
            )

        }

        return (
            <>
                <Heading
                    text="Overview"
                />
                <div className="date-info">
                    <div className="left">
                        <p className="curret-date">
                            { formatDate(currentDate) }
                        </p>
                    </div>
                    <div className="right">
                        <div className="switch-button" onClick={ () => this.changeYear(-1) } >
                            <FontAwesomeIcon 
                                icon={ faAngleLeft }
                            />
                        </div>
                        <div className="text">
                            { currentDate.year }
                        </div>
                        <div className="switch-button" onClick={ () => this.changeYear(1) } >
                            <FontAwesomeIcon 
                                icon={ faAngleRight }
                            />
                        </div>
                    </div>
                </div>
                <CalendarComponent
                    monthsData={ monthsData }
                    todaysDate={ todaysDate }
                    currentDate={ currentDate }
                    setCurrentDate={ (date) => this.setCurrentDate(date) }
                    setSearchType={ (type) => this.setSearchType(type) }
                />
            </>
        )
    }
}
