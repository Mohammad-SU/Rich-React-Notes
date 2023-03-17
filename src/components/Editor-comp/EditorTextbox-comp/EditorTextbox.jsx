import { useState } from 'react'
import './EditorTextbox.css'

export default function EditorTextbox({ valueMain, onChangeMain, valueTitle, onChangeTitle }) {
    return (
        <div>
            <textarea 
                className="EditorMainTextbox textboxStyle" 
                maxLength={40000}
                placeholder="Enter text..."
                value={valueMain}
                onChange={onChangeMain}
            ></textarea>
            <textarea 
                className="EditorTitle textboxStyle" 
                maxLength={30}
                placeholder="Enter title..."
                value={valueTitle}
                onChange={onChangeTitle}
            ></textarea>
        </div>
    )
}