import './Note.css'

export default function Note({ id, text, title, date }) {
    return (
        <div className="Note">
            <div className="note-main-area">
                <span>{text}</span>
            </div>
            <div className="note-info">
                <h4 className="note-title">{title}</h4>
                <h4 className="note-date">{date}</h4>
            </div>
        </div>
    )
}