import './Editor.css'
import FormatToolbar from '../FormatToolbar-comp/FormatToolbar'
import EditorTextbox from '../EditorTextbox-comp/EditorTextbox'
import { CgClose } from "react-icons/cg"

export default function Editor({ valueMain, onChangeMain, valueTitle, onChangeTitle, onClick }) {

    return (
        <div className="Editor">
            <div className="close-editor-button" onClick={onClick}>
                <CgClose className="close-editor-icon"/>
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