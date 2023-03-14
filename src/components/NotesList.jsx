import Note from "./Note"
import './NotesList.css'

export default function NotesList( {notes} ) {
    const notesData = notes.map(note => 
        <Note 
            id={note.id}
            text={note.text}
            title={note.title}
            date={note.date}
        />
    )

    return (
        <div className="NotesList">
            {notesData}
        </div>
    )
}