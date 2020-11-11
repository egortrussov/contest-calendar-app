import React, { Component } from 'react'

import Navbar from '../../components/Navbar/Navbar'

import './css/MainApp.css'

export default class MainApp extends Component {

    render() {
        return (
            <div className="app-container">
                <Navbar />
                <main>
                    Main app
                </main>
            </div>
        )
    }
}
