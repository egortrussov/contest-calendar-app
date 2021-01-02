import React, { Component } from 'react'
import Button from '../ReusableComponents/Button'

import Input from '../ReusableComponents/InputField'

import './css/style.css'

export default class CreateSubjectForm extends Component {
    render() {
        return (
            <form onSubmit={ (e) => this.props.onSubmit(e) } className="create-subject-form">
                <div className="label">
                    Create subject
                </div>
                <div className="group">
                    <Input 
                        type="text"
                        name="name"
                        onChange={ (e) => true }
                    />
                    <Button
                        type="cta"
                        size="sm"
                        text="Create"
                    />
                </div>
            </form>
        )
    }
}
