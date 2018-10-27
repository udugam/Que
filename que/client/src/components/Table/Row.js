import React from "react"
import "./row.css"

export const Row = props => {
    return (
        <tr onClick={props.goToCue}>
            <td>{props.productionId}</td>
            <td>{props.productionTitle}</td>
            <td>{props.type}</td>
            <td>{props.productionDuration}</td>
            <td>{props.musicDuration}</td>
        </tr>
    )
}