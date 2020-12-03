import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Button from '../../../components/ReusableComponents/Button';
import Dropdown from '../../../components/ReusableComponents/Dropdown';
import Heading from '../../../components/ReusableComponents/Heading';
import Input from '../../../components/ReusableComponents/InputField';
import Spinner from '../../../components/ReusableComponents/Spinner';
import { AuthContext } from '../../../Context/AuthContext';

import { fetchQuery } from '../../../dataFetching/GraphQLQuery';

import './css/style.css'

export default class CreateContest extends Component {

    state = {
        name: '',
        description: '',
        subjectsList: [],
        subjectsNames: [],
        subject: null,
        currentSubjectIndex: null,
        gradesList: [10, 2, 1, 5, 8, 11, 9, 3, 4, 6, 7],
        grade: null,
        date: null,
        isLoading: true,
        errors: [],
        isRedirect: false,
        isSubmitted: false
    }

    static contextType = AuthContext;

    async componentDidMount() {

        if (!this.context.user || !this.context.token || !this.context.user.isTeacher && !this.context.user.isAdmin) {
            this.setState({
                isRedirect: true
            })
            return;
        }

        let subjectsData = await fetchQuery(`
            query {
                subjects {
                    _id,
                    name 
                }
            }
        `);

        const subjectsNames = subjectsData.data.subjects.map(subject => subject.name);

        this.setState({
            isLoading: false,
            subjectsList: subjectsData.data.subjects,
            subjectsNames
        })
    }

    setCredential(e) {

        const field = e.target.name;
        const value = e.target.value;

        this.setState({
            [field]: value
        })
    }
    
    setSubject(index) {
        const { subjectsList } = this.state;

        this.setState({
            subject: subjectsList[index]._id,
            currentSubjectIndex: index
        })
    }

    setGrade(index) {
        const { gradesList } = this.state;

        this.setState({
            grade: gradesList[index]
        })
    }

    setDate(e) {
        let value = e.target.value;

        let date = new Date(value);

        let newDate = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        }

        this.setState({
            date: newDate
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            isSubmitted: true
        })

        const { 
            name,
            subject,
            grade,
            date,
            description,
            website,
            
        } = this.state;

        let errors = [], hasErrors = false;

        if (!name) { errors['name'] = 'Enter contest name'; hasErrors = true };
        if (!subject) { errors['subject'] = 'Enter contest subject'; hasErrors = true };
        if (!grade) { errors['grade'] = 'Enter contest grade'; hasErrors = true };
        if (!date) { errors['date'] = 'Enter contest date'; hasErrors = true };

        if (hasErrors) {
            this.setState({
                errors,
                isSubmitted: false
            });
            return;
        }

        let request = {
            name,
            subject,
            grade,
            date,
            description,
            website
        };

        fetch(`${ this.context.proxy }/api/contest/createContest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': this.context.token
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);

                if (!res.success) {
                    errors['submit'] = 'Access denied';
                    this.setState({
                        errors,
                        isSubmitted: false 
                    })
                    return;
                }

                
            })
    }

    render() {

        const { 
            isLoading, 
            errors, 
            subjectsNames, 
            currentSubjectIndex, 
            grade,
            gradesList,
            isSubmitted,
            isRedirect
        } = this.state;

        if (isRedirect) return (
            <Redirect 
                to="/app/"
            />
        )

        if (isLoading) return (
            <Spinner />
        )

        return (
            <>
                <Heading 
                    text="Create new contest"
                />
                <form 
                    onSubmit={ (e) => this.handleSubmit(e) }
                >
                    <Input
                        type="text"
                        name="name"
                        label="Contest name"
                        errorMsg={ errors['name'] }
                        onChange={ (e) => this.setCredential(e) }
                    />
                    <div className="input-group">
                        <div className="label">
                            Select subject 
                        </div>
                        <Dropdown
                            options={ subjectsNames }
                            currentOption={ currentSubjectIndex === null ? 'Select subject' : subjectsNames[currentSubjectIndex] }
                            onSelect={ index => this.setSubject(index) }
                        />
                    </div>
                    <div className="input-group">
                        <div className="label">
                            Select grade 
                        </div>
                        <Dropdown
                            options={ gradesList }
                            currentOption={ grade }
                            onSelect={ index => this.setGrade(index) }
                            placeholder={ 'Select grade' }
                        />
                    </div>
                    <div className="input-group">
                        <div className="label">
                            Date
                        </div>
                        <input 
                            type="date" 
                            onChange={ (e) => this.setDate(e) } 
                        />
                    </div>
                    <div className="input-group">
                        <div className="label">
                            Description (optional) 
                        </div> 
                        <textarea name="description" onChange={ (e) => this.setCredential(e) }></textarea>
                        <label htmlFor="description"></label>
                    </div>
                    <Input
                        type="text"
                        name="website"
                        label="Website (optional)"
                        onChange={ (e) => this.setCredential(e) }
                    />

                    <Button
                        text="Create"
                        type="cta"
                        isLoading={ isSubmitted }
                    />
                </form>
            </>
        )
    }
}
