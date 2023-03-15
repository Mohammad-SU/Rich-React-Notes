import './NewNoteBtn.css'
import { BsPencilSquare } from "react-icons/bs";

export default function NewNoteBtn() {
    return (
        <button className="NewNoteBtn">
                <div>
                    <BsPencilSquare size="3em" color="white"/>
                </div>
        </button>
    )
}