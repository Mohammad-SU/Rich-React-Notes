import './EditorTextbox.css'
import { memo } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

function EditorTextbox({ content, onChangeContent, title, onChangeTitle }) {

    return (
        <div className="EditorTextbox">
            <textarea 
                className="editor-title textbox-style" 
                maxLength={130}
                placeholder="Enter title..."
                value={title}
                onChange={onChangeTitle}
            ></textarea>
            <CKEditor
                editor={Editor}
                config={{
                    toolbar: [
                        'undo', 'redo', 'findAndReplace', 
                        '|',
                        'heading',
                        '|', 
                        'bold', 'italic', 'underline',
                        {
                            label: 'Customize Font',
                            icon: 'text',
                            items: [ 'fontFamily', 'fontColor', 'fontBackgroundColor' ]
                        },
                        'fontSize', 
                        '|',
                        'link',
                        {
                            label: 'Insert',
                            icon: 'plus',
                            items: [ 'insertTable', 'imageInsert', 'mediaEmbed', 
                                    'codeBlock', 'htmlEmbed', 'horizontalLine' ]
                        },
                        '|',
                        {
                            label: 'Lists',
                            icon: false,
                            items: [ 'bulletedList', 'numberedList', 'todoList']
                        },
                        {
                            label: 'Align',
                            icon: false,
                            items: [ 'indent', 'outdent','alignment' ]
                        },
                        'strikethrough', 'subscript', 'superscript', 'code', 'specialCharacters', 
                        'blockQuote', 'textPartLanguage', 'removeFormat', 'sourceEditing'
                    ],
                    fontSize: {
                        options: [
                            9, 12, 15, 'default', 18, 21, 24, 27, 30, 33, 36, 39, 42
                        ],
                    },
                    mediaEmbed: {
                        previewsInData: true
                    },
                    wordCount: {
                        onUpdate: stats => {
                            const wordCountWrapper = document.querySelector(".word-count");

                            wordCountWrapper.innerHTML = `Words: ${ stats.words } | Characters: ${ stats.characters }`
                        }
                    },
                    removePlugins: ["MediaEmbedToolbar"],
                    placeholder: "Enter text..."
                }}
                className="editor-content-textbox textbox-style" 
                data={content}
                onChange={onChangeContent}
            />
            <div className='word-count'></div>
        </div>
    )
}

export default memo(EditorTextbox)