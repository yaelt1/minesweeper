import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';

const Cell = props => {
    const handleClick = event => {
        event.preventDefault();
        if (props.gameOver) return; // cant click on cells after game is over
        if (event.type === 'click') {
            props.openCell(props.data); // Handle left-click
        } else if (event.type === 'contextmenu') {
            props.openFlag(props.data); // Handle right-click
        }
    };

    let renderCell = () => {
        // flaged
        if (props.data.flagged) {
            return (
                <div className="cell flagged" onContextMenu={handleClick}><FontAwesomeIcon icon={faFlag} />
                </div>)
        }
        // not flaged
        else {
            if (props.data.revealed) {
                // not near a mine & reveled
                if (props.data.value === 0) {
                    return (
                        <div className="cell revealed" onClick={handleClick} onContextMenu={handleClick}>
                        </div>)
                }

                else {
                    // revealed mine- end of game
                    if (props.data.isMine) {
                        return (
                            <div className="cell has mine" onClick={handleClick}>
                                <FontAwesomeIcon icon={faBomb} className='BombIcon' />
                            </div>)
                    }

                    // reveled & near a mine 
                    else {
                        return (<div className="cell revealed"
                            onClick={handleClick}>{props.data.value}</div>)
                    }

                }
            }
            else {
                // not revealed and not flagged
                return (
                    <div className="cell" onContextMenu={handleClick} onClick={handleClick}>
                    </div>)
            }
        }
    }
    return (renderCell())

}
export default Cell;

