import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar'
import Register from './Auth/Register/Register'

import './css/MainApp.css'

export default class MainApp extends Component {

    render() {
        return (
            <div className="app-container">
                <Navbar />
                <main>
                    <Switch>
                        <Route path="/app/register" component={ Register } />
                    </Switch>
                </main>
            </div>
        )
    }
}