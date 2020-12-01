import React, { Component } from 'react'

import { fetchQuery } from '../../../dataFetching/GraphQLQuery'

import Heading from '../../ReusableComponents/Heading'
import Dropdown from '../../ReusableComponents/Dropdown'
import Spinner from '../../ReusableComponents/Spinner'

export default class FilterOptions extends Component {

    state = {
        subjects: [],
        subjectsNames: [],
        grades: [10, 2, 1, 5, 8, 11, 9, 3, 4, 6, 7],
        isLoading: true,
    }

    async componentDidMount() {
        let subjectsData = await fetchQuery(`
            query {
                subjects {
                    _id,
                    name
                }
            }
        `)

        let subjectsNames = subjectsData.data.subjects.map(subject => subject.name);

        this.setState({
            subjects: subjectsData.data.subjects,
            subjectsNames,
            isLoading: false
        })
    }
    

    render() {

        const { grades, subjects, isLoading, subjectsNames } = this.state;

        if (isLoading) return (
            <Spinner
                size="sm"
            />
        )

        return (
            <div className="filter-options">
                <Heading
                    type="xsm"
                    text="Fulter by: "
                />
                <div className="options">
                    <div className="option">
                        <div className="label">
                            Subject: 
                        </div>
                        <Dropdown
                            options={ subjectsNames }
                            currentOption={ 'Any' }
                            size="sm"
                        />
                    </div>
                    <div className="option">
                        <div className="label">
                            Grade: 
                        </div>
                        <Dropdown
                            options={ grades }
                            currentOption={ 'Any' }
                            size="sm"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
