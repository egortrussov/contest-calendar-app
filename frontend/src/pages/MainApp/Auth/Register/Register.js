import React, { Component } from 'react'
import Dropdown from '../../../../components/ReusableComponents/Dropdown';

import Heading from '../../../../components/ReusableComponents/Heading'
import Input from '../../../../components/ReusableComponents/InputField'

import '../css/style.css'

export default class Register extends Component {

    state = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isTeacher: false,
        errors: [],
        gradesList: [10, 2, 1, 5, 8, 11, 9, 3, 4, 6, 7],
        secretCode: ''
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

    render() {

        const { errors, grade, isTeacher, gradesList } = this.state;

        return (
            <div>
                <Heading 
                    text="Register"
                    type="lg"
                />

                <form>
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
                </form>

            </div>
        )
    }
}
