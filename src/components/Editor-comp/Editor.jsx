import './Editor.css'
import FormatToolbar from './FormatToolbar-comp/FormatToolbar'
import EditorTextbox from './EditorTextbox-comp/EditorTextbox'

export default function Editor() {
    return (
        <div className="Editor">
            <FormatToolbar />
            <EditorTextbox />
        </div>
    )
}