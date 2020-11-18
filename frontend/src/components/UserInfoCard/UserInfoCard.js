import React, { Component } from 'react'
import Spinner from '../ReusableComponents/Spinner';

import './css/style.css'

export default class UserInfoCard extends Component {
    render() {

        const { user, isLoading } = this.props;

        if (isLoading) return <Spinner size="md" />

        let status = 'Student';

        
        if (user.isTeacher) status = 'Teacher';
        if (user.isAdmin) status = 'Admin';

        return (
            <div className="user-info-card">
                <div className="block">
                    <div className="block-name">
                        Full name: 
                    </div>
                    <div className="block-content">
                        { user.fullName }
                    </div>
                </div>
                <div className="block">
                    <div className="block-name">
                        Status: 
                    </div>
                    <div className="block-content">
                        { status }
                    </div>
                </div>
                <div className="block">
                    <div className="block-name">
                        Organisation: 
                    </div>
                    <div className="block-content">
                        { user.organisation.name }
                    </div>
                </div>
                {
                    ( !user.isTeacher && !user.isAdmin ) ? (
                        <div className="block">
                            <div className="block-name">
                                Grade: 
                            </div>
                            <div className="block-content">
                                { user.grade }
                            </div>
                        </div>
                    ) : <></>
                }
            </div>
        )
    }
}
