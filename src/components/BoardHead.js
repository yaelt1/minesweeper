import React from "react";

const BoardHead = props => {
    let minutes = Math.floor(props.time / 60);
    let seconds = props.time - minutes * 60 || 0;

    let formatSec = seconds < 10 ? `0${seconds}` : seconds;
    let formatMin = minutes < 10 ? `0${minutes}` : minutes;

    let time = `${formatMin}:${formatSec}`;

    return (
        <div className="BoardHead">
            <div className="timer">{time}</div>
            <div className="mines">
                <span className="caption">Number of mines</span>
                <span className="count"> {props.mines}</span>
            </div>

        </div>
    )
}
export default BoardHead;