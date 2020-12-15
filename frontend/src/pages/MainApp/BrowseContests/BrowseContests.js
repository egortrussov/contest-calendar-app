import React, { Component } from 'react'

import FilterOptions from '../../../components/ContestsDisplayModal/FilterOptions/FilterOptions';
import ContestsTable from '../../../components/ContestsTable/ContestsTable';
import PassedContestFilter from '../../../components/PassedContestFilter/PassedContestFilter';
import Button from '../../../components/ReusableComponents/Button';
import Heading from '../../../components/ReusableComponents/Heading'

import { fetchQuery } from '../../../dataFetching/GraphQLQuery';
import { getCurrentDate } from '../../../middleware/getCurrentDate';
import { hasContestEnded, sortContests } from '../../../middleware/sortContests';

export default class BrowseContests extends Component {

    state = {
        subject: null,
        grade: null,
        filterOptions: {
            subject: null,
            grade: null
        },
        isPassedContestsShown: true,
        isSubmitted: false,
        contests: null
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

    async getContests() {
        console.log('oko')
        const { filterOptions } = this.state;

        this.setState({
            isSubmitted: true
        })

        let query = `
            query {
                contests(${ filterOptions.subject ? `subject: "${ filterOptions.subject }", ` : '' } ${ filterOptions.grade ? `grade: ${ filterOptions.grade }, ` : '' } ) {
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
        `;

        let contestsData = await fetchQuery(query);

        console.log(contestsData)

        if (contestsData.errors) {
            this.setState({
                isSubmitted: false
            })
            return;
        }

        let contests = contestsData.data.contests;

        this.setState({
            contests,
            isSubmitted: false
        })
    }

    render() {

        let { isPassedContestsShown, isSubmitted, contests } = this.state;

        const fields = [
            { name: 'featureContest', displayName: '' },
            { name: 'name', displayName: 'Name' },
            { name: 'subject', displayName: 'Subject' },
            { name: 'grade', displayName: 'Grade' },
            { name: 'date', displayName: 'Date' },
            { name: 'createdBy', displayName: 'Creator' },
            { name: 'website', displayName: 'Website' },
        ]

        console.log(contests)

        if (contests)
            contests = sortContests(contests);

        if (!isPassedContestsShown && contests) 
            contests = contests.filter(contest => !hasContestEnded(contest, getCurrentDate()))
        
        

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
                    onClick={ () => this.getContests() }
                    isLoading={ isSubmitted }
                />
                <PassedContestFilter
                    isSelected={ isPassedContestsShown }
                    onChange={ () => this.togglePassedContestsShowState() }
                />

                {
                    contests === null ? (
                        <></>
                    ) : contests === [] ? (
                        <>
                            <Heading
                                text="No contests!"
                                size="md"
                            />
                        </>
                    ) : (
                        <>
                            <ContestsTable
                                fields={ fields }
                                contests={ contests }
                            />
                        </>
                    )
                }

                
                
            </div>
        )
    }
}
