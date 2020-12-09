import React, { Component } from 'react'

import { fetchQuery } from '../../../dataFetching/GraphQLQuery'

import Heading from '../../ReusableComponents/Heading'
import Dropdown from '../../ReusableComponents/Dropdown'
import Spinner from '../../ReusableComponents/Spinner'

export default class FilterOptions extends Component {

    state = {
        subjects: [],
        subjectsNames: [],
        grades: [null, 10, 2, 1, 5, 8, 11, 9, 3, 4, 6, 7],
        isLoading: true,
        currentGradeName: 'Any',
        currentSubjectName: 'Any'
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

        subjectsNames.unshift('Any')
        subjectsData.data.subjects.unshift({
            _id: null,
            name: 'Any'
        })

        this.setState({
            subjects: subjectsData.data.subjects,
            subjectsNames,
            isLoading: false
        })
    }
    
    setSubject(index) {
        const { subjects } = this.state;

        this.props.setFilterOption('subject', subjects[index]._id);

        this.setState({
            currentSubjectName: subjects[index].name
        })
    }

    setGrade(index) {
        const { grades } = this.state;

        this.props.setFilterOption('grade', grades[index])

        this.setState({
            currentGradeName: grades[index]
        })
    }

    render() {

        const { grades, subjects, isLoading, subjectsNames, currentGradeName, currentSubjectName, page } = this.state;

        if (isLoading) return (
            <Spinner
                size="sm"
            />
        )

        if (page === 'browseContests') return (
            <div className="filter-options">
                <Heading
                    type="xsm"
                    text="Filter by: "
                />
                <div className="options">
                    <div className="option">
                        <div className="label">
                            Subject: 
                        </div>
                        <Dropdown
                            options={ subjectsNames }
                            currentOption={ 'Any' }
                            onSelect={ (index) => this.setSubject(index)  }
                            currentOption={ currentSubjectName }
                        />
                    </div>
                    <div className="option">
                        <div className="label">
                            Grade: 
                        </div>
                        <Dropdown
                            options={ grades }
                            currentOption={ 'Any' }
                            onSelect={ (index) => this.setGrade(index) }
                            currentOption={ currentGradeName === null ? 'Any' : currentGradeName }
                        />
                    </div>
                </div>
            </div>
        )

        return (
            <div className="filter-options">
                <Heading
                    type="xsm"
                    text="Filter by: "
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
                            onSelect={ (index) => this.setSubject(index)  }
                            currentOption={ currentSubjectName }
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
                            onSelect={ (index) => this.setGrade(index) }
                            currentOption={ currentGradeName === null ? 'Any' : currentGradeName }
                        />
                    </div>
                </div>
            </div>
        )
    }
}
