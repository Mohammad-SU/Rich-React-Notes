import './Note.css'
import { memo } from 'react'
import { motion } from 'framer-motion'
import parse from "html-react-parser"

function Note({ id, text, title, dateCreated, dateMod, onNoteClick }) {  
    return (
        <div className="Note">
            <motion.div
                className="note-main-area" 
                readOnly 
                onClick={() => onNoteClick(id, text, title)}  
                whileHover={{ scale:1.02 }}
                whileTap={{ scale:0.98 }}
            > 
                {parse(text)}
            </motion.div>
            <div className="note-info">
                <h4 className="note-title">{title}</h4>
                <h4 className="note-date">{dateMod}</h4>
            </div>
        </div>
    )
}

export default memo(Note)