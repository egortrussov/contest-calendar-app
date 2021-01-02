import React, { Component } from 'react'

import SubjectRow from './SubjectRow';

import './css/style.css'

export default class SubjectsOverviewTable extends Component {
    render() {

        const { subjects } = this.props;

        return (
            <div className="contests-table subjects-overview">
                <div className="row head">
                    <div className="cell">
                        Subject name
                    </div>
                    <div className="cell small">
                        Rename
                    </div>
                    <div className="cell small">
                        Delete
                    </div>
                </div>
                {
                    subjects.map(subject => (
                        <SubjectRow
                            subject={ subject }
                        />
                    ))
                }
            </div>
        )
    }
}
