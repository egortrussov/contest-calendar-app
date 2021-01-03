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
        isSubmitted: false,
        editedSubjectId: null
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

    deleteSubjectFromState(_id) {
        let { subjects } = this.state;

        subjects = subjects.filter(sbj => sbj._id !== _id);

        this.setState({
            subjects
        })
    }

    addSubjectToState(subject) {
        let { subjects } = this.state;

        subjects.push(subject)

        this.setState({
            subjects
        })
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
                this.addSubjectToState(res.subject)
            })
    }

    chooseSubjectToEdit(_id) {
        this.setState({
            editedSubjectId: _id
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
                this.deleteSubjectFromState(_id);
            })
    }

    changeEditedSubjectName(name) {
        let { editedSubjectId, subjects } = this.state;

        for (let inx = 0; inx < subjects.length; inx++) {
            if (subjects[inx]._id === editedSubjectId) 
                subjects[inx].name = name;
        }
        
        this.setState({
            subjects
        })
    }

    setEditedSubjectName(e) {
        e.preventDefault();

        let { editedSubjectId, subjects } = this.state;

        let { name } = subjects.find(sbj => sbj._id === editedSubjectId);

        let requestBody = {
            _id: editedSubjectId,
            name
        }

        fetch(`${ this.context.proxy }/api/subject/changeSubjectName`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': this.context.token 
            },
            body: JSON.stringify(requestBody)
        }) 
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    editedSubjectId: null
                })
                // this.deleteSubjectFromState(_id);
            })
    }


    render() {

        let { subjects, editedSubjectId } = this.state;
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
                            chooseSubjectToEdit={ (_id) => this.chooseSubjectToEdit(_id) }
                            changeEditedSubjectName={ (name) => this.changeEditedSubjectName(name) }
                            setEditedSubjectName={ (e) => this.setEditedSubjectName(e) }
                            editedSubjectId={ editedSubjectId }
                        /> 
                    )
                }
            </div>
        )
    }
}
