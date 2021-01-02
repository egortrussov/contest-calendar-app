import React, { Component } from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom';

import Heading from '../../../components/ReusableComponents/Heading'
import Spinner from '../../../components/ReusableComponents/Spinner';

import { AuthContext } from '../../../Context/AuthContext'

import './css/style.css'
import FrontPage from './FrontPage/FrontPage';
import SubjectsOverviewPage from './SubjectsOverviewPage/SubjectsOverviewPage';

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
                <Switch>
                    <Route exact path="/app/admin/" component={ FrontPage } />
                    <Route path="/app/admin/subjects" component={ SubjectsOverviewPage } />
                </Switch>
            </>
        )
    }
}
