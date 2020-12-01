import React, { Component } from 'react'

import './css/style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faTimes } from '@fortawesome/free-solid-svg-icons';

import Heading from '../ReusableComponents/Heading';
import Spinner from '../ReusableComponents/Spinner';

import { formatDate } from '../../middleware/dateFromat';
import ContestsTable from '../ContestsTable/ContestsTable';
import FilterOptions from './FilterOptions/FilterOptions';

export default class ContestsDisplayModal extends Component {

    state = {
        isExtended: false,
        contests: [],
        contestsToDisplay: [],
        filterOptions: {
            subject: null,
            grade: null
        }
    }

    toggleExtendedState() {
        this.setState({
            isExtended: !this.state.isExtended
        })
    }

    setFilterOption(option, value) {
        let { filterOptions } = this.state;

        filterOptions[option] = value;

        this.setState({
            filterOptions
        })
    }

    filterContests(contests) {
        const { filterOptions } = this.state;

        let res = contests.filter(contest => {
            let result = true;
            
            if (filterOptions.grade && contest.grade !== filterOptions.grade) 
                result = false;
            
            if (filterOptions.subject && contest.subject._id !== filterOptions.subject) 
                result = false;
            
            return result;
        })

        return res;
    }

    render() {

        const { isExtended } = this.state;

        let { isHidden, date, isLoading, contests } = this.props;

        const fields = [
            { name: 'name', displayName: 'Name' },
            { name: 'subject', displayName: 'Subject' },
            { name: 'grade', displayName: 'Grade' },
            { name: 'date', displayName: 'Date' },
            { name: 'createdBy', displayName: 'Creator' },
            { name: 'website', displayName: 'Website' }
        ]

        if (contests && !contests.length) return (
            <div className={ `display-modal ${ isExtended ? 'extended' : '' } ${ isHidden ? 'hidden' : '' }` }>
                <Heading
                    type="sm"
                    text={ 'There are no contests on ' + formatDate(date) }
                />
            </div>
        )

        contests = this.filterContests(contests)

        return (
            <div className={ `display-modal ${ isExtended ? 'extended' : '' } ${ isHidden ? 'hidden' : '' }` }>
                <div className="content">
                    <div className="handlers">
                        <div 
                            className={ `handler-btn ${ isExtended ? 'active' : '' }` }
                            onClick={ () => this.toggleExtendedState() }
                        >
                            <FontAwesomeIcon
                                icon={ faArrowUp }
                                className="icon"
                            />
                        </div>
                        <div className="handler-btn" onClick={ () => this.props.closeModal() }>
                            <FontAwesomeIcon
                                icon={ faTimes }
                            />
                        </div>
                    </div>
                
                    <Heading
                        type="sm"
                        text={ 'Contests for ' + formatDate(date) }
                    />

                    <FilterOptions
                        setFilterOption={ (option, value) => this.setFilterOption(option, value) }
                    />

                    {
                        isLoading ? (
                            <Spinner 
                                size="md"
                            />
                        ) : (
                            <ContestsTable
                                type="full"
                                fields={ fields }
                                contests={ contests }
                            />
                        )
                    }

                </div>

            </div>
        )
    }
}
