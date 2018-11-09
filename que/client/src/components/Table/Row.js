import React from "react"
import CsvCreator from 'react-csv-creator'; 
import "./row.css"

export const Row = props => {
    return (
        <tr>
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
                <button className="btn btn-secondary float-right" onClick={() => props.downloadFile(props.productionTitle)}>
                    Download CSV
                </button>
            </td>
        </tr>
    )
}