import './Note.css'
import { useState, useContext, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { NoteContext } from '/src/context/NoteContext'
import NoteOptions from "../NoteOptions-comp/NoteOptions"
import NoteOptionsToggle from "../NoteOptionsToggle-comp/NoteOptionsToggle"
import parse from "html-react-parser"

function Note({ id, content, searchContent, title, dateCreated, dateMod }) {
    const {handleNoteClick} = useContext(NoteContext)

    const [showOptions, setShowOptions] = useState(false)
    const NoteOptionsToggleClick = () => {
        setShowOptions(current => !current)
    }

    return (
        <div className="Note" key={id}>
            <div className="note-main-area">
                <motion.div
                    className="note-content-area" 
                    readOnly 
                    onClick={() => handleNoteClick(id, content, title)}  
                    whileHover={{ scale:1.02 }}
                    whileTap={{ scale:0.98 }}
                > 
                    {parse(content)}
                </motion.div>

                <AnimatePresence>
                    {showOptions && <NoteOptions 
                        id={id}
                        content={content}
                        title={title} 
                        dateCreated={dateCreated} 
                        dateMod={dateMod}
                    />}
                </AnimatePresence>
            </div>

            <NoteOptionsToggle onClick={NoteOptionsToggleClick}/>

            <div className="note-info">
                <h4 className="note-title">{title}</h4>
                <h4 className="note-date">{dateMod}</h4>
            </div>
        </div>
    )
}

export default memo(Note)