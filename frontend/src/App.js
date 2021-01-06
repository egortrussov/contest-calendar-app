import React, { Component } from 'react'
import  { BrowserRouter, Switch, Route } from 'react-router-dom'


import MainApp from './pages/MainApp/MainApp'
import LandingPage from './pages/LandingPage/LandingPage'

import './GlobalCSS/globalStyles.css'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <>
                    <Switch>
                        <Route exact path="/" component={ LandingPage } /> 
                        
                        <Route path="/app" component={ MainApp } />
                    </Switch>
                </>
            </BrowserRouter>
        )
    }
}
