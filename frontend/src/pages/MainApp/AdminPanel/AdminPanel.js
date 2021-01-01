import React, { Component } from 'react'

import { AuthContext } from '../../../Context/AuthContext'

import Heading from '../../../components/ReusableComponents/Heading'
import Spinner from '../../../components/ReusableComponents/Spinner';
import { Link, Redirect } from 'react-router-dom';

export default class AdminPanel extends Component {

    state = {
        isRedirectToLogin: false,
        isRedirect: false,
        isLoading: true
    }

    static contextType = AuthContext;

    chechAuthState() {

        let res = {
            isRedirectToLogin: false,
            isRedirect: false,
            isLoading: true
        }

        if (!this.context.token) {
            this.context.logout();
            res.isLoading = false;
            res.isRedirectToLogin = true;
        } 
        if (this.context.user) {
            if (!this.context.user.isAdmin) {
                res.isLoading = false;
                res.isRedirect = true;
            } else {
                res.isLoading = false;
            }
        }

        return res;
    }

    render() {

        let { isLoading, isRedirectToLogin, isRedirect } = this.chechAuthState();

        if (isLoading) return (
            <Spinner
                size="md"
            />
        )

        if (isRedirectToLogin) return (
            <Redirect
                to="/app/login"
            />
        )

        console.log(isRedirect)

        if (isRedirect) return (
            <Redirect
                to="/app/"
            />
        )

        return (
            <>
                <Heading
                    text="Admin panel"
                />
                <div className="links-container">
                    <div className="link">
                        <Link to="admin/subjects"> 
                            Manage subjects
                        </Link>
                    </div>
                    <div className="link">
                        <Link to="admin/subjects"> 
                            Manage organisations
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}
