import './Editor.css'
import FormatToolbar from '../FormatToolbar-comp/FormatToolbar'
import EditorTextbox from '../EditorTextbox-comp/EditorTextbox'
import { CgClose } from "react-icons/cg"
import {useState} from 'react';

export default function Editor({ valueMain, onChangeMain, valueTitle, onChangeTitle, onCloseClick }) {
    const [isHovering, setIsHovering] = useState(false);
    const closeEnter = () => {
        setIsHovering(true);
    }
    const closeLeave = () => {
        setIsHovering(false);
    }
    
    return (
        <div className="Editor">
            <div className="close-editor-button" onClick={onCloseClick} onMouseEnter={closeEnter} onMouseLeave={closeLeave}>
                <CgClose className="close-editor-icon" style={{color: isHovering ? "red" : "white"}}/>
            </div>
            <FormatToolbar />
            <EditorTextbox 
                valueMain={valueMain} 
                onChangeMain={onChangeMain}
                valueTitle={valueTitle}
                onChangeTitle={onChangeTitle}
            ></EditorTextbox> 
        </div>
    )
}