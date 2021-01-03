import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

export default class SubjectRow extends Component {
    render() {

        const { subject, isBeingEdited } = this.props;

        return (
            <div className="row">
                <div className="cell">
                    { isBeingEdited ? (
                        <form onSubmit={ (e) => this.props.setEditedSubjectName(e) }>
                            <input type="text" value={ subject.name } onChange={ (e) => this.props.changeEditedSubjectName(e.target.value) } />
                            <button>Done</button>
                        </form>
                    ) : subject.name }
                </div>
                <div className="cell small">
                    <FontAwesomeIcon
                        className="icon"
                        icon={ faPen }
                        onClick={ () => this.props.chooseSubjectToEdit(subject._id) }
                    />
                </div>
                <div className="cell small">
                    <FontAwesomeIcon
                        className="icon"
                        icon={ faTimes }
                        onClick={ () => this.props.deleteSubject(subject._id) }
                    />
                </div>
            </div>
        )
    }
}
