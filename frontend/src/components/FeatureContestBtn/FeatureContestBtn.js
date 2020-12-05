import React, { Component } from 'react'

import { AuthContext } from '../../Context/AuthContext';

import Spinner from '../ReusableComponents/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './css/style.css'

export default class FeatureContestBtn extends Component {

    state = {
        isActive: false
    }

    static contextType = AuthContext;

    componentDidMount() {
        let { contestId } = this.props;
        const { user } = this.context;

        let isActive = user.featuredContests.find(contest => (
            contest._id === contestId
        )) !== undefined;

        this.setState({
            isActive
        })

    }

    featureContest() {
        const { isActive } = this.state;
        const { contestId } = this.props;

        let request = {
            contestId
        }

        fetch(`${ this.context.proxy }/api/contest/featureContest`, {
            method: 'POST',
            headers: {
                'x-auth-token': this.context.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(res => {
                if (res.isTokenError) {
                    this.context.logout();
                    window.location.href = '/app/login'
                    return false;
                }
                console.log(res)
                this.context.user = res.user;
                this.setState({
                    isActive: !isActive
                })
            })
    }

    render() {

        const { isActive } = this.state;

        if (!this.context.user) return (
            <Spinner
                size="sm"
            />
        )

        return (
            <div className="feature-contest-icon">
                <FontAwesomeIcon
                    icon={ faStar }
                    className={ `icon ${ isActive ? 'active' : '' }` }
                    onClick={ () => this.featureContest() }
                />
            </div>
        )
    }
}
