import React, { Component } from 'react'

import FilterOptions from '../../../components/ContestsDisplayModal/FilterOptions/FilterOptions';
import PassedContestFilter from '../../../components/PassedContestFilter/PassedContestFilter';
import Button from '../../../components/ReusableComponents/Button';
import Heading from '../../../components/ReusableComponents/Heading'

export default class BrowseContests extends Component {

    state = {
        subject: null,
        grade: null,
        filterOptions: {
            subject: null,
            grade: null
        },
        isPassedContestsShown: true
    }

    setFilterOption(option, value) {
        let { filterOptions } = this.state;

        filterOptions[option] = value;

        this.setState({
            filterOptions
        })
    }

    togglePassedContestsShowState() {
        this.setState({
            isPassedContestsShown: !this.state.isPassedContestsShown
        })
    }

    render() {

        let { isPassedContestsShown } = this.state;

        return (
            <div className="browse-contests-contaainer">
                <Heading
                    text="Browse contests"
                />
                <FilterOptions
                    page="browseContests"
                    setFilterOption={ (option, value) => this.setFilterOption(option, value) }
                />
                <Button
                    type="cta"
                    text="Search"
                />
                <PassedContestFilter
                    isSelected={ isPassedContestsShown }
                    onChange={ () => this.togglePassedContestsShowState() }
                />
            </div>
        )
    }
}
