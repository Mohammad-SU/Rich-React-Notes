import './EditorTextbox.css'

export default function EditorTextbox({ valueMain, onChangeMain, valueTitle, onChangeTitle }) {
    return (
        <div className="EditorTextbox">
            <textarea 
                className="editor-title textbox-style" 
                maxLength={60}
                placeholder="Enter title..."
                value={valueTitle}
                onChange={onChangeTitle}
            ></textarea>
            <textarea 
                className="editor-main-textbox textbox-style" 
                maxLength={40000}
                placeholder="Enter text..."
                value={valueMain}
                onChange={onChangeMain}
            ></textarea>
        </div>
    )
}