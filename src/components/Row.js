import React from "react";
import Cell from "./Cell"

export const Row = props => {
    let cells = props.cells.map((data, index) => {
        return (
            <Cell key={index} data={data}
                openCell={props.openCell}
                openFlag={props.openFlag}
                gameOver={props.gameOver} />)

    })
    return (
        <div className="row">{cells}</div>
    )
}
export default Row;