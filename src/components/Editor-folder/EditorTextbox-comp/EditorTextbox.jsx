import './EditorTextbox.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function EditorTextbox({ mainText, onChangeMain, titleText, onChangeTitle }) {
    return (
        <div className="EditorTextbox">
            <textarea 
                className="editor-title textbox-style" 
                maxLength={130}
                placeholder="Enter title..."
                value={titleText}
                onChange={onChangeTitle}
            ></textarea>
            <CKEditor
                editor={ClassicEditor} 
                className="editor-main-textbox textbox-style" 
                maxLength={40000}
                placeholder="Enter text..."
                data={mainText}
                onChange={onChangeMain}
            />
        </div>
    )
}