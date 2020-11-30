import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

import Heading from '../../../components/ReusableComponents/Heading'
import CalendarComponent from '../../../components/Calendar/CalendarComponent'

import { AuthContext } from '../../../Context/AuthContext'

import { formatDate } from '../../../middleware/dateFromat';

import './css/style.css'
import ContestsDisplayModal from '../../../components/ContestsDisplayModal/ContestsDisplayModal';
import { fetchQuery } from '../../../dataFetching/GraphQLQuery';

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
        searchType: null,
        isContestsPageShown: true,
        contestsToDisplay: [],
        isContestsPageLoading: false
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
            month: date.getMonth() + 1,
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
        this.setState({
            currentDate: date
        }, () => {
            this.setModalState(true)
        })
    }

    setSearchType(type) {
        this.setState({
            searchType: type
        })
    }

    setModalState(state) {
        this.setState({
            isContestsPageShown: state,
            isContestsPageLoading: true
        }, () => this.getContests())
    }

    closeModal() {
        this.setState({
            isContestsPageShown: false,
            isContestsPageLoading: false,
            contestsToDisplay: []
        })
    }

    async getContests() {
        const { currentDate, searchType } = this.state;

        console.log({currentDate, searchType})

        let contestsData = await fetchQuery(`
            query {
                contests(searchType: "${ searchType }", day: ${ currentDate.day }, month: ${ currentDate.month }, year: ${ currentDate.year }) {
                    _id,
                    name,
                    description,
                    website,
                    grade,
                    date {
                        day,
                        month,
                        year
                    },
                    subject {
                        _id,
                        name
                    },
                    createdBy {
                        fullName
                    }
                }
            }
        `)

        console.log(contestsData)

        this.setState({
            contestsToDisplay: contestsData.data.contests,
            isContestsPageLoading: false
        })
    }

    render() {

        const { currentDate, monthsData, todaysDate, isContestsPageShown, isContestsPageLoading, contestsToDisplay } = this.state;

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
            <div className={ `calendar-page ${ isContestsPageShown ? 'has-pb' : '' }` }>
                <Heading
                    text="Overview"
                />
                <div className="date-info">
                    <div className="left">
                        <p className="curret-date">
                            { formatDate(todaysDate) }
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
                <ContestsDisplayModal
                    isHidden={ !isContestsPageShown }
                    closeModal={ () => this.closeModal() }
                    date={ currentDate }
                    isLoading={ isContestsPageLoading }
                    contests={ contestsToDisplay }
                />
            </div>
        )
    }
}
