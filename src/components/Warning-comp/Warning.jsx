import "./Warning.css"
import { AiFillWarning } from "react-icons/ai"

export default function Warning({ onYesClick, onCancelClick }) {
    return (
        <div className="Warning">
            <AiFillWarning className="warning-icon" size="3em"/>
            <h4 className="warning-text">Are you sure you want to close the editor without saving?</h4>
            <button className="yes-btn options" onClick={onYesClick}>Yes</button>
            <button className="cancel-btn options" onClick={onCancelClick}>Cancel</button>
        </div>
    )
}