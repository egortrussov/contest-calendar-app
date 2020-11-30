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
                        let text = contest[name];

                        if (name == 'createdBy') 
                            text = contest.createdBy.fullName;

                        if (name == 'subject') 
                            text = contest.subject.name;
                        
                        if (name == 'date') 
                            text = formatDateShort(contest.date)
                        
                        let extraClassName = '';

                        if (name == 'grade') 
                            extraClassName = 'small'
                        

                        return (
                            <Cell
                                text={ text }
                                extraClassName={ extraClassName }
                            />
                        )
                    })
                }
            </div>
        )
    }
}
