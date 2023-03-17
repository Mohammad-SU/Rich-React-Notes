import './Editor.css'
import FormatToolbar from './FormatToolbar-comp/FormatToolbar'
import EditorTextbox from './EditorTextbox-comp/EditorTextbox'

export default function Editor({ valueMain, onChangeMain, valueTitle, onChangeTitle }) {

    return (
        <div className="Editor">
            <FormatToolbar />
            <EditorTextbox 
                valueMain={valueMain} 
                onChangeMain={onChangeMain}
                valueTitle={valueTitle}
                onChangeTitle={onChangeTitle}
            >
            </EditorTextbox>  
        </div>
    )
}