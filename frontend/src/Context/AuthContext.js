import React, { Component, createContext } from 'react';
import Cookies from 'js-cookie';

import { getProxy } from '../dataFetching/getProxy';
import { fetchQuery } from '../dataFetching/GraphQLQuery';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        token: Cookies.get('token'),
        userId: Cookies.get('userId'),
        user: null,
        proxy: getProxy()
    }

    async componentDidMount() {
        const { userId, token, user } = this.state;
        

        if (!token) return;

        if (user) return;

        let userData = await fetchQuery(`
            query {
                user(_id: "${ userId }") {
                    fullName,
                    isTeacher,
                    isAdmin,
                    grade,
                    organisation {
                        name
                    },
                    featuredContests {
                        _id,
                        name,
                        date {
                            day,
                            month,
                            year
                        }
                    }
                }
            }
        `)

        this.setState({
            user: userData.data.user
        })
    }
    

    login(token, expiration, user) {
        Cookies.set('token', token, {
            expires: expiration
        })
        Cookies.set('userId', user._id, {
            expires: expiration
        })

        this.setState({
            token: token,
            userId: user._id,
            user: user
        })
    }

    logout() {
        Cookies.remove('token');
        Cookies.remove('userId');

        this.setState({
            token: null,

        })
    }

    render() {

        return (
            <AuthContext.Provider
                value={{
                    ...this.state,
                    login: (token, expiration, user) =>  this.login(token, expiration, user),
                    logout: () => this.logout()
                }}
            >
                { this.props.children }
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider