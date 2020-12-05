import React, { Component } from 'react'

import Cell from './Cell';
import TableRow from './TableRow';

import './css/style.css'

export default class ContestsTable extends Component {
    render() {

        const { contests, fields } = this.props;
        console.log(fields)


        return (
            <div className="contests-table">
                <div className="row head">
                    {
                        fields.map(field => (
                            <Cell
                                text={ field.displayName }
                                extraClassName={ field.name === 'grade' || field.name == 'featureContest' ? 'small' : '' }
                            />
                        ))
                    }
                </div>
                {
                    contests.map(contest => (
                        <TableRow
                            contest={ contest }
                            fields={ fields }
                        />
                    ))
                }
            </div>
        )
    }
}
