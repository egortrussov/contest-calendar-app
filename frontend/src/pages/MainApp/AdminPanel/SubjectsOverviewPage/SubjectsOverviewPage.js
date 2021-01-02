import React, { Component } from 'react'
import GoBackLink from '../../../../components/GoBackLink/GoBackLink'
import Heading from '../../../../components/ReusableComponents/Heading'

export default class SubjectsOverviewPage extends Component {
    render() {
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
            </div>
        )
    }
}
