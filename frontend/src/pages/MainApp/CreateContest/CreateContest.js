import React, { Component } from 'react'
import Dropdown from '../../../components/ReusableComponents/Dropdown';

import Heading from '../../../components/ReusableComponents/Heading';
import Input from '../../../components/ReusableComponents/InputField';
import Spinner from '../../../components/ReusableComponents/Spinner';

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
        isLoading: true,
        errors: []
    }

    async componentDidMount() {
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
            subject: subjectsList[index],
            currentSubjectIndex: index
        })
    }

    setGrade(index) {
        const { gradesList } = this.state;

        this.setState({
            grade: gradesList[index]
        })
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {

        const { 
            isLoading, 
            errors, 
            subjectsNames, 
            currentSubjectIndex, 
            grade,
            gradesList
        } = this.state;

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
                    <Input
                        type="text"
                        name="website"
                        label="Website (optional)"
                        onChange={ (e) => this.setCredential(e) }
                    />
                </form>
            </>
        )
    }
}
