import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Heading from '../../../../components/ReusableComponents/Heading'

export default class FrontPage extends Component {
    render() {
        return (
            <div>
                <Heading
                    text="Admin panel"
                /> 
                <div className="links-container">
                    <div className="link">
                        <Link to="/app/admin/subjects"> 
                            Manage subjects
                        </Link>
                    </div>
                    <div className="link">
                        <Link to="/app/admin/organisations"> 
                            Manage organisations
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
