import './NewNoteBtn.css'
import { BsPencilSquare } from "react-icons/bs";
import { IconContext } from "react-icons";

export default function NewNoteBtn() {

    return (
        <button className="NewNoteBtn">
            <IconContext.Provider value={{ size: "3em", color: "white" }}>
                <div>
                    <BsPencilSquare />
                </div>
            </IconContext.Provider>
        </button>
    )
}