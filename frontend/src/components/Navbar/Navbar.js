import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

import { init } from './navbarScript'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAlignLeft, faSignInAlt, faSignOutAlt, faUserPlus, faChevronLeft, faCalendarAlt, faPlus, faLaptop, faCalendarTimes } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../Context/AuthContext'

class Navbar extends Component {
    state = {
        isLoggedIn: false,
        isHidden: false,
        hasBeenInitialised: false
    }

    componentDidMount() {
        init();
    }
    

    static contextType = AuthContext;

    logout() {
        this.context.logout();
        window.location.href = process.env.PUBLIC_URL + '/app/login'
    }

    render() {

        // const token = Cookies.get('token');

        const { user, token } = this.context;

        console.log({ user, token })

        let isLoggedIn = true;
        if (!token || token === '' || !user)
            isLoggedIn = false;
        

        return (
            <nav>
                <div className="toggle-view" id="toggle-view">
                    <FontAwesomeIcon className="icon" icon={ faChevronLeft } />
                </div>
                <div className="nav-item nav-top">
                    <a href="/">
                        <h2 className="logo"> 
                            <FontAwesomeIcon icon={ faCalendarAlt } className="icon" />
                            <span className="text">EasyCalendar</span>
                        </h2>
                    </a>
                </div>
                { 
                    isLoggedIn && (
                        <div className="nav-item nav-middle">

                            <NavLink exact className="nav-link" to={"/app/profile"}><FontAwesomeIcon className="icon" icon={ faHome } /> <span className="text">Profile</span></NavLink>

                            <NavLink exact className="nav-link" to={"/app/"}><FontAwesomeIcon className="icon" icon={ faCalendarTimes } /> <span className="text">Calendar</span></NavLink>

                            <NavLink className="nav-link" to={"/app/subjects"}><FontAwesomeIcon className="icon" icon={ faAlignLeft } /><span className="text">Browse subjects</span></NavLink>

                            {
                                (user.isTeacher || user.isAdmin) ? (
                                    <NavLink className="nav-link" to={"/app/createContest"}><FontAwesomeIcon className="icon" icon={ faPlus } /> <span className="text">Add contest</span></NavLink>
                                ) : <></>
                            }

                            {
                                (user.isTeacher) ? (
                                    <NavLink className="nav-link" to={"/app/admin"}><FontAwesomeIcon className="icon" icon={ faLaptop } /> <span className="text">Admin panel</span></NavLink>
                                ) : <></>
                            }

                        </div>
                    )
                }
                
                <div className="nav-item nav-bottom">
                    { !isLoggedIn && (
                        <>
                            <NavLink className="nav-link" to={"/app/login"}><FontAwesomeIcon className="icon" icon={ faSignInAlt } /> <span className="text">Login</span></NavLink>
                            <NavLink className="nav-link" to={"/app/register"}><FontAwesomeIcon className="icon" icon={ faUserPlus } /> <span className="text">Register</span></NavLink>
                        </>
                    ) }
                    { isLoggedIn && (
                        <button className="nav-link" onClick={ this.logout.bind(this) } ><FontAwesomeIcon className="icon" icon={ faSignOutAlt } /> <span className="text">Logout</span></button>
                    ) }                    
                </div>
            </nav>
        )
    }
}

export default Navbar