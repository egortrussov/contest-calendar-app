import React, { Component } from 'react'
import Heading from '../../../components/ReusableComponents/Heading';
import Spinner from '../../../components/ReusableComponents/Spinner';
import UserInfoCard from '../../../components/UserInfoCard/UserInfoCard';

import { AuthContext } from '../../../Context/AuthContext'

export default class Profile extends Component {

    state = {
        user: null
    }

    static contextType = AuthContext;

    render() {

        const { user } = this.context;

        if (!user) {
            return <Spinner size="lg" />
        } 

        return (
            <>
                <Heading 
                    text={ `Hello, ${ user.fullName }` }
                />  
                <UserInfoCard 
                    user={ user }
                />
            </>
        )
    }
}
