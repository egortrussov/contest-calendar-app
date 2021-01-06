import React, { Component } from 'react'
import { formatDateShort } from '../../middleware/dateFromat';

import Cell from './Cell';

export default class TableRow extends Component {

    render() {

        const { contest, fields } = this.props;

        return (
            <div className="row">
                {
                    fields.map(field => {
                        let { name } = field;
                        
                        if (name === 'featureContest') {
                            return (
                                <Cell 
                                    extraClassName="small"
                                    text="effe"
                                    isFeature={ true }
                                    contestId={ contest._id }
                                />
                            )
                        }

                        let text = contest[name];

                        if (name === 'createdBy') 
                            text = contest.createdBy.fullName;

                        if (name === 'subject') 
                            if (contest.subject) 
                                text = contest.subject.name;
                            else 
                                text = '-'
                        
                        if (name === 'date') 
                            text = formatDateShort(contest.date)
                        
                        let extraClassName = '';

                        if (name === 'grade') 
                            extraClassName = 'small'
                        


                        return (
                            <Cell
                                text={ text || '-' }
                                extraClassName={ extraClassName }
                            />
                        )
                    })
                }
            </div>
        )
    }
}
