import React, { Component } from 'react'
import FeatureContestBtn from '../FeatureContestBtn/FeatureContestBtn';

export default class Cell extends Component {
    render() {

        const { text, extraClassName, isFeature, contestId } = this.props;

        if (isFeature) return (
            <div className={ "cell " + extraClassName }>
                <FeatureContestBtn
                    contestId={ contestId }
                />
            </div>
        )

        return (
            <div className={ "cell " + extraClassName }>
                { text }
            </div>
        )
    }
}
