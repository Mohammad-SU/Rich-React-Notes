import Note from "../Note-comp/Note"
import './NotesList.css'
import { memo } from "react"

function NotesList({ notes, onNoteClick }) {
    const notesData = notes.map(note => 
        <Note 
            key={note.id}
            id={note.id}
            text={note.text}
            title={note.title}
            date={note.date}
            onNoteClick={onNoteClick}
        />
    )

    return (
        <div className="NotesList">
            {notesData}
        </div>
    )
}

export default memo(NotesList)