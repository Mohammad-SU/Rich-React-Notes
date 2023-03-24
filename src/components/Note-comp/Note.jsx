import './Note.css'
import { motion } from 'framer-motion'

export default function Note({ id, text, title, date, onNoteClick }) {
    return (
        <div className="Note">
            <motion.textarea
                className="note-main-area" 
                readOnly 
                onClick={onNoteClick}  
                value={text}
                whileHover={{ scale:1.02 }}
                whileTap={{ scale:0.98 }}
            ></motion.textarea>
            <div className="note-info">
                <h4 className="note-title">{title}</h4>
                <h4 className="note-date">{date}</h4>
            </div>
        </div>
    )
}