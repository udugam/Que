import React from "react"
import CsvCreator from 'react-csv-creator'; 
import "./row.css"

export const Row = props => {
    return (
        <tr>
            <td>{props.productionId}</td>
            <td>{props.productionTitle}</td>
            <td>{props.type}</td>
            <td>{props.productionDuration}</td>
            <td>{props.musicDuration}</td>
            <td>
                <button className="btn btn-secondary float-right" onClick={() => props.goToCue(props.productionId)}>
                    Edit Cue
                </button>
            </td>
            <td>
                <button className="btn btn-secondary float-right">
                    Download CSV
                </button>
                {/* <CsvCreator
                            filename='quesheet_csv'
                            headers={this.state.headers}
                            rows={this.state.test}
                        >
                            <h6>Download CSV</h6>
                        </CsvCreator> */}
            </td>
        </tr>
    )
}