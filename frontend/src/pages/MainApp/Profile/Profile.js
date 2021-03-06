import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import ContestsTable from '../../../components/ContestsTable/ContestsTable';
import PassedContestFilter from '../../../components/PassedContestFilter/PassedContestFilter';
import Heading from '../../../components/ReusableComponents/Heading';
import Spinner from '../../../components/ReusableComponents/Spinner';
import UserInfoCard from '../../../components/UserInfoCard/UserInfoCard';

import { AuthContext } from '../../../Context/AuthContext'
import { fetchQuery } from '../../../dataFetching/GraphQLQuery';
import { getCurrentDate } from '../../../middleware/getCurrentDate';
import { hasContestEnded, sortContests } from '../../../middleware/sortContests';

import './css/style.css'

export default class Profile extends Component {

    state = {
        user: null,
        featuredContests: null,
        isRedirectToLogin: false,
        respWasSent: false,
        isPassedContestsShown: true
    }

    static contextType = AuthContext;

    togglePassedContestsShowState() {
        this.setState({
            isPassedContestsShown: !this.state.isPassedContestsShown
        })
    }

    async getContests() {

        this.setState({
            respWasSent: true
        })

        if (!this.context.token) {
            this.setState({
                isRedirectToLogin: true
            })
            return;
        }

        let argsArray = '[';
        const { featuredContests } = this.context.user;

        featuredContests.forEach((contest, inx) => {
            if (inx) 
                argsArray += ', '
            argsArray += '"' + contest._id + '"';
        })

        argsArray += ']';

        let featuredContestsData = await fetchQuery(`
            query {
                contests(searchType: "array", contestsIDs: ${ argsArray }) {
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
        `);

        console.log(featuredContestsData);

        if (!featuredContestsData.data.contests) return;

        this.setState({
            featuredContests: featuredContestsData.data.contests
        })
    }    

    render() {

        const { user } = this.context;
        let { featuredContests, isRedirectToLogin, respWasSent, isPassedContestsShown } = this.state;
        
        if (isRedirectToLogin) return (
            <Redirect 
                to="/app/login"
            />
        )

        if (!user) {
            return <Spinner size="lg" />
        } 

        if (user && !respWasSent) 
            this.getContests()

        const fields = [
            { name: 'featureContest', displayName: '' },
            { name: 'name', displayName: 'Name' },
            { name: 'subject', displayName: 'Subject' },
            { name: 'grade', displayName: 'Grade' },
            { name: 'date', displayName: 'Date' },
            { name: 'createdBy', displayName: 'Creator' },
            { name: 'website', displayName: 'Website' },
        ]

        featuredContests = sortContests(featuredContests)

        if (!isPassedContestsShown && featuredContests) 
            featuredContests = featuredContests.filter(contest => !hasContestEnded(contest, getCurrentDate()))

        return (
            <>
                <Heading 
                    text={ `Hello, ${ user.fullName }` }
                />  
                <UserInfoCard 
                    user={ user }
                />

                <PassedContestFilter
                    isSelected={ isPassedContestsShown }
                    onChange={ () => this.togglePassedContestsShowState() }
                />

                <div className="contests-container">

                    {
                        featuredContests === null ? (
                            <Spinner
                                size="md"
                            />
                        ) : featuredContests && featuredContests.length === 0 ? (
                            <Heading
                                type="sm"
                                text="No featured contests yet"
                            />
                        ) : ( 
                            <>
                                <Heading
                                    type="sm"
                                    text="Featured contests: "
                                />
                                
                                <ContestsTable
                                    fields={ fields }
                                    contests={ featuredContests }
                                />
                            </> 
                        )
                    }
                </div>
            </>
        )
    }
}
