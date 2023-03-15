import "./FormatToolbar.css"
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaRegCheckSquare} from "react-icons/fa";
import { IconContext } from "react-icons";


export default function FormatToolbar() {
    return (
        <IconContext.Provider value={{ size: "1.6em", className: "format-icon"}}>
            <div className="FormatToolbar">
                <button className="bold-tool"><FaBold /></button>
                <button className="italic-tool"><FaItalic /></button>
                <button className="underline-tool"><FaUnderline /></button>
                <button className="underline-tool"><FaStrikethrough /></button>
                <button className="unordered-list-tool"><FaListUl /></button>
                <button className="ordered-list-tool"><FaListOl /></button>
                <button className="check-list-tool"><FaRegCheckSquare /></button>
            </div>
        </IconContext.Provider>
    )
}