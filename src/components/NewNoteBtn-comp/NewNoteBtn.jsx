import './NewNoteBtn.css'
import { BsPencilSquare } from "react-icons/bs";

export default function NewNoteBtn( {onClick} ) {
    return (
        <button className="NewNoteBtn" onClick={onClick}><BsPencilSquare size="3em" color="white"/></button>
    )
}