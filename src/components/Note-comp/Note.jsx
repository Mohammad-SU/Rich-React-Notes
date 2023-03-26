import './Note.css'
import { motion } from 'framer-motion'
import parse from "html-react-parser"

export default function Note({ id, text, title, date, onNoteClick }) {
    return (
        <div className="Note">
            <motion.p
                className="note-main-area" 
                readOnly 
                onClick={() => onNoteClick(id, text, title)}  
                whileHover={{ scale:1.02 }}
                whileTap={{ scale:0.98 }}
            > 
                {parse(text)}
            </motion.p>
            <div className="note-info">
                <h4 className="note-title">{title}</h4>
                <h4 className="note-date">{date}</h4>
            </div>
        </div>
    )
}