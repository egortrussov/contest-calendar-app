import React, { Component, createContext } from 'react';
import Cookies from 'js-cookie';

import { getProxy } from '../dataFetching/getProxy';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        token: Cookies.get('token'),
        proxy: getProxy()
    }

    login(token, expiration) {
        Cookies.set('token', token, {
            expires: expiration
        })

        this.setState({
            token: token
        })
    }

    logout() {
        Cookies.remove('token');

        this.setState({
            token: null
        })
    }

    render() {

        return (
            <AuthContext.Provider
                value={{
                    ...this.state,
                    login: this.login,
                    logout: this.logout
                }}
            >
                { this.props.children }
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider