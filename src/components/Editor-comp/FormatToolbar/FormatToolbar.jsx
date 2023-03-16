import "./FormatToolbar.css"
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaRegCheckSquare, FaRemoveFormat} from "react-icons/fa";
import { IconContext } from "react-icons";


export default function FormatToolbar() {
    return (
        <IconContext.Provider value={{className: "format-icon", size: "1.6em"}}>
            <div className="FormatToolbar">
                <button className="bold-tool"><FaBold /></button>
                <button className="italic-tool"><FaItalic /></button>
                <button className="underline-tool"><FaUnderline /></button>
                <button className="underline-tool"><FaStrikethrough /></button>
                <button className="unordered-list-tool"><FaListUl /></button>
                <button className="ordered-list-tool"><FaListOl /></button>
                <button className="check-list-tool"><FaRegCheckSquare /></button>
                <button className="check-list-tool"><FaRemoveFormat /></button>
            </div>
        </IconContext.Provider>
    )
}