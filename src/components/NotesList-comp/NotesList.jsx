import Note from "../Note-comp/Note"
import './NotesList.css'

export default function NotesList({ notes, onNoteClick }) {
    const notesData = notes.map(note => 
        <Note 
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