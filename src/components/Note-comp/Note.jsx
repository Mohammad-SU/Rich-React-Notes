import './Note.css'

export default function Note({ id, text, title, date, onNoteClick }) {
    return (
        <div className="Note">
            <textarea
                className="note-main-area" 
                readOnly 
                onClick={onNoteClick}  
                value={text}
            ></textarea>
            <div className="note-info">
                <h4 className="note-title">{title}</h4>
                <h4 className="note-date">{date}</h4>
            </div>
        </div>
    )
}