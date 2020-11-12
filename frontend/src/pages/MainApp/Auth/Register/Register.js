import React, { Component } from 'react'
import Dropdown from '../../../../components/ReusableComponents/Dropdown';

import Heading from '../../../../components/ReusableComponents/Heading'
import Input from '../../../../components/ReusableComponents/InputField'

export default class Register extends Component {

    state = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: [],
    }

    setCredential(e) {
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({
            [name]: value
        })
    }

    setGrade(option) {
        this.setState({
            grade: option
        })
    }

    render() {

        const { errors, grade } = this.state;

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
                        <div className="label">
                            Grade: 
                        </div>
                        <Dropdown
                            options={ [1, 2, 3] }
                            placeholder="Select grade"
                            currentOption={ grade }
                            onSelect={ (grade) => this.setGrade(grade) }
                        />
                    </div>
                </form>

            </div>
        )
    }
}
