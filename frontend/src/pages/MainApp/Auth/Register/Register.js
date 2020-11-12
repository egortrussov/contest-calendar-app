import React, { Component } from 'react'

import Heading from '../../../../components/ReusableComponents/Heading'
import Input from '../../../../components/ReusableComponents/InputField'

export default class Register extends Component {

    state = {
        fullName: '',
        email: '',
        password: '',

    }

    setCredential(e) {
        const name = e.target.name;
        const value = e.target.value;
        
        this.setState({
            [name]: value
        })
    }

    render() {
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
                </form>

            </div>
        )
    }
}
