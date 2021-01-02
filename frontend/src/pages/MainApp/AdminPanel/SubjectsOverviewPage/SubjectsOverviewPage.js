import React, { Component } from 'react'

import { AuthContext } from '../../../../Context/AuthContext'
import { fetchQuery } from '../../../../dataFetching/GraphQLQuery'

import GoBackLink from '../../../../components/GoBackLink/GoBackLink'
import Heading from '../../../../components/ReusableComponents/Heading'
import { Redirect } from 'react-router-dom'
import Spinner from '../../../../components/ReusableComponents/Spinner'
import SubjectsOverviewTable from '../../../../components/SubjectsOverviewTable/SubjectsOverviewTable'
import CreateSubjectForm from '../../../../components/CreateSubjectForm/CreateSubjectForm'

export default class SubjectsOverviewPage extends Component {

    state = {
        subjects: null,
        isSubmitted: false
    }

    static contextType = AuthContext

    async componentDidMount() {
        let data = await fetchQuery(`
            query {
                subjects {
                    _id,
                    name
                }
            }
        `)
        
        this.setState({
            subjects: data.data.subjects
        })
    }

    chechAuthState() {

        let res = {
            isRedirectToLogin: false,
            isRedirect: false,
            isLoading: true
        }

        if (!this.context.token) {
            this.context.logout();
            res.isLoading = false;
            res.isRedirectToLogin = true;
        } 
        if (this.context.user) {
            if (!this.context.user.isAdmin) {
                res.isLoading = false;
                res.isRedirect = true;
            } else {
                res.isLoading = false;
            }
        }

        return res;
    }    

    render() {

        let { subjects } = this.state;
        let { isLoading, isRedirectToLogin, isRedirect } = this.chechAuthState();
 
        if (isLoading) return (
            <Spinner
                size="md"
            />
        )

        if (isRedirectToLogin) return (
            <Redirect
                to="/app/login"
            />
        )

        if (isRedirect) return (
            <Redirect
                to="/app/"
            /> 
        )

        return (
            <div>
                <GoBackLink
                    label="Go to overview"
                    link="/app/admin/"
                />
                <Heading
                    text="Subjects view"
                    type="md"
                />
                <CreateSubjectForm
                    
                />
                {
                    subjects === null ? (
                        <Spinner />
                    ) : !subjects.length ? (
                        <Heading
                            type="sm"
                            text="No subjects created yet"
                        />
                    ) : (
                        <SubjectsOverviewTable
                            subjects={ subjects }
                        />
                    )
                }
            </div>
        )
    }
}
