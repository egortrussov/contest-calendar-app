import { separateOperations } from 'graphql';
import React, { Component } from 'react'

export default class Dropdown extends Component {

    state = {
        isOpen: false,
    }

    toggleOpenState() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {

        const { options, onSelect, currentOption, placeholder } = this.props;
        const { isOpen } = this.state;


        return (
            <div className="dropdown" onClick={ () => this.toggleOpenState() }>
                <div className="selected">
                    { currentOption ? currentOption : placeholder }
                </div>
                <div className={ `collapse ${ isOpen ? "open" : "closed" }` }>
                    {
                        options.map(option => (
                            <div className="item" onClick={ () => onSelect(option) }>
                                { option }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
