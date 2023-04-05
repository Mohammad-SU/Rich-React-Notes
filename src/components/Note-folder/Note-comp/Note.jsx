import './Note.css'
import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NoteOptions from "../NoteOptions-comp/NoteOptions"
import NoteOptionsBtn from "../NoteOptionsBtn-comp/NoteOptionsBtn"
import parse from "html-react-parser"

function Note({ id, text, title, dateCreated, dateMod, onNoteClick, onNoteDeleteClick }) {
    const [showOptions, setShowOptions] = useState(false)
    
    const NoteOptionsBtnClick = () => {
        setShowOptions(current => !current)
    }

    return (
        <div className="Note" key={id}>
            <div className="note-main-area">
                <motion.div
                    className="note-text-area" 
                    readOnly 
                    onClick={() => onNoteClick(id, text, title)}  
                    whileHover={{ scale:1.02 }}
                    whileTap={{ scale:0.98 }}
                > 
                    {parse(text)}
                </motion.div>

                <AnimatePresence>
                    {showOptions && <NoteOptions noteID={id} onNoteDeleteClick={onNoteDeleteClick}/>}
                </AnimatePresence>
            </div>

            <NoteOptionsBtn onClick={NoteOptionsBtnClick}/>

            <div className="note-info">
                <h4 className="note-title">{title}</h4>
                <h4 className="note-date">{dateMod}</h4>
            </div>
        </div>
    )
}

export default memo(Note)