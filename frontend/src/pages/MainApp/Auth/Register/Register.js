import React, { Component } from 'react'
import Button from '../../../../components/ReusableComponents/Button';
import Dropdown from '../../../../components/ReusableComponents/Dropdown';

import Heading from '../../../../components/ReusableComponents/Heading'
import Input from '../../../../components/ReusableComponents/InputField'
import Spinner from '../../../../components/ReusableComponents/Spinner';

import { fetchQuery } from '../../../../dataFetching/GraphQLQuery';

import '../css/style.css'

async function test() {
    return fetch('http://localhost:5000/check')
            .then(res => res.json())
            .then(res => {
                console.log(res)
                return res
            })
}

export default class Register extends Component {

    state = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isTeacher: false,
        errors: [],
        gradesList: [10, 2, 1, 5, 8, 11, 9, 3, 4, 6, 7],
        secretCode: '',
        organisation: '',
        organisations: '',
        chosenOrganisationName: '',
        isLoading: true,
        isSubmitted: false
    }

    async componentDidMount() {
        let query = `
            query {
                organisations {
                    _id,
                    name
                }
            }
        `;

        let organisations = await fetchQuery(query);

        this.setState({
            isLoading: false,
            organisations: organisations.data.organisations
        })
    }
    

    setCredential(e) {
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({
            [name]: value
        })
    }

    setGrade(index) {
        const { gradesList } = this.state;

        this.setState({
            grade: gradesList[index]
        })
    }

    setTeacherState() {
        this.setState({
            isTeacher: !this.state.isTeacher
        })
    }

    setOrganisation(index) {
        const { organisations } = this.state;

        this.setState({
            organisation: organisations[index]._id,
            chosenOrganisationName: organisations[index].name
        })
    }

    register(e) {
        e.preventDefault();

        this.setState({
            isSubmitted: true
        })

        let formEl = e.target;

        let formData = new FormData(formEl); 

        let {
            email,
            password,
            confirmPassword,
            fullName,
            organisation,
            isTeacher,
            grade,
            secretCode
        } = this.state;

        let creds = {
            email,
            password,
            fullName,
            organisation,
        }

        let errors = [];
        if (!creds.email.length) errors['email'] = 'U must enter a email';
        if (!creds.fullName.length) errors['fullName'] = 'U must enter ur name';
        if (!creds.organisation) errors['organisation'] = 'Choose an organisation';
        if (!creds.password || creds.password.length < 8) errors['password'] = 'Passsword must be at least 8 characters long';
        if (confirmPassword !== creds.password) errors['confirmPassword'] = 'Passwords do not match';

        // const { isTeacher, grade, secretCode } = this.state;

        if (!isTeacher && !grade) errors['grade'] = 'Select ur grade'; 

        if (errors['fullName'] || errors['email'] || errors['grade'] || errors['organisation'] || errors['password'] || errors['confirmPassword'] ) {
            console.log(errors)
            this.setState({
                isSubmitted: false,
                errors
            })
            return;
        }
    }

    render() {

        const { errors, grade, isTeacher, gradesList, isLoading, organisations, chosenOrganisationName, isSubmitted } = this.state;

        if (isLoading) return (
            <Spinner 
                size="lg"
            />
        )

        let organisationNames = [];
        organisations.forEach(curr => organisationNames.push(curr.name));

        return (
            <div>
                <Heading 
                    text="Register"
                    type="lg"
                />

                <form onSubmit={ (e) => this.register(e) }>
                    <Input
                        type="email"
                        name="email"
                        label="E-mail"
                        onChange={ (e) => this.setCredential(e) }
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        onChange={ (e) => this.setCredential(e) }
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        label="Confirm password"
                        onChange={ (e) => this.setCredential(e) }
                    />
                    <Input
                        type="text"
                        name="fullName"
                        label="Full name"
                        onChange={ (e) => this.setCredential(e) }
                    />
                    <div className="input-group">
                        <div className="label">
                            Organisation
                        </div>
                        <Dropdown
                            options={ organisationNames }
                            placeholder="Select organisations"
                            currentOption={ chosenOrganisationName }
                            onSelect={ (organisationIndex) => this.setOrganisation(organisationIndex) }
                        />
                    </div>
                    <div className="input-group">
                        <div className="label checkbox-container">
                            <span>
                                Register as teacher 
                            </span>
                            <input type="checkbox" onChange={ () => this.setTeacherState() } />
                        </div>
                    </div>
                    {
                        isTeacher ? (
                            <>
                            <Input
                                type="text"
                                name="secretCode"
                                label="Secret code (get from school admin)"
                                onChange={ (e) => this.setCredential(e) }
                            />
                            </>
                        ) : (
                            <>
                                <div className="input-group">
                                    <div className="label">
                                        Grade: 
                                    </div>
                                    <Dropdown
                                        options={ gradesList }
                                        placeholder="Select grade"
                                        currentOption={ grade }
                                        onSelect={ (grade) => this.setGrade(grade) }
                                    />
                                </div>
                            </>

                        )
                    }

                    <div className="input-group">
                        <Button
                            text="Register"
                            isLoading={ isSubmitted }
                            
                            type="cta"
                        />
                    </div>
                </form>

            </div>
        )
    }
}
