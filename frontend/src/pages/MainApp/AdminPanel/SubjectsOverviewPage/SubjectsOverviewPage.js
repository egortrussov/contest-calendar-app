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

    createSubject(e) {
        e.preventDefault();

        console.log(this.context.token)

        let formData = new FormData(e.target);
        let name = formData.get('name');

        fetch(`${ this.context.proxy }/api/subject/createSubject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': this.context.token 
            },
            body: JSON.stringify({ name: name })
        }) 
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }

    deleteSubject(_id) {
        fetch(`${ this.context.proxy }/api/subject/deleteSubject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': this.context.token 
            },
            body: JSON.stringify({ _id })
        }) 
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
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
                    onSubmit={ (e) => this.createSubject(e) }
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
                            deleteSubject={ (_id) => this.deleteSubject(_id) }
                        />
                    )
                }
            </div>
        )
    }
}
