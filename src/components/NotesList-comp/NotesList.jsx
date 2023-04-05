import Note from "../Note-folder/Note-comp/Note"
import './NotesList.css'
import { useState, useEffect, memo } from "react"

function NotesList({ notes, onNoteClick, onNoteDeleteClick }) {
    const notesMapped = notes.map(note => {
        return <Note 
            key={note.id}
            id={note.id}
            content={note.content}
            title={note.title}
            dateCreated={note.dateCreated}
            dateMod={note.dateMod}
            onNoteClick={onNoteClick}
            onNoteDeleteClick={onNoteDeleteClick}
        />
    })

    useEffect(() => {
        const noteFigureImage = document.querySelectorAll(".note-content-area > figure.image"); // For fixing center images
        noteFigureImage.forEach((figure) => {
            if (!figure.classList.contains("image-style-side")) {// If the image has figure element but is not image-style-side class,
                figure.classList.add("image-style-center")       // Then add this class
            }
        })

        const noteFigureTable = document.querySelectorAll(".note-content-area > figure.table")
        noteFigureTable.forEach((figure) => {
            if (figure.style.float == "left" || figure.style.float == "right") {// If the image has figure element but is not image-style-side class,
                figure.classList.add("table-left-or-right")
                figure.classList.remove("table-center")       // Then add this class
            } else {
                figure.classList.add("table-center")
                figure.classList.remove("table-left-or-right")
            }
        })

        const ul_lists = document.querySelectorAll(".note-content-area > ul")    
        ul_lists.forEach((ul) => {
            if (!ul.classList.contains("todo-list")) {
                ul.classList.add("normal-ul-list")
            }
        })
    })

    const [noNotes, setNoNotes] = useState(false)
    useEffect(() => {
        var NoteElement = document.querySelector(".Note");
        NoteElement === null ? setNoNotes(true) : setNoNotes(false)
    })

    return (
        <div className="NotesList">
            {notesMapped}
            {noNotes && 
                <div className="no-notes-text-cont">
                    <h1>No Notes</h1>
                    <p>Click the button on the bottom-right to add a note.</p>
                </div>
            }
        </div>
    )
}

export default memo(NotesList)