import './NoteOptions.css'
import { useState, useContext, memo } from 'react'
import { nanoid } from "nanoid"
import { motion } from 'framer-motion'
import parse from "html-react-parser"
import { IconContext } from "react-icons"
import { NoteContext } from '/src/context/NoteContext';
import { BsTrash3Fill, BsStarFill, BsClipboard2PlusFill } from "react-icons/bs"
import { IoDuplicate } from "react-icons/io5"
import { MdDriveFileMoveRtl } from "react-icons/md"

function NoteOptions({ id, content, title, dateCreated, dateMod }) {
    const {setNotes, memoNotes, notifySuccess} = useContext(NoteContext)

    const [isHovering, setIsHovering] = useState(false);
    const optionContEnter = () => {
        setIsHovering(true);
    }
    const optionContLeave = () => {
        setIsHovering(false);
    }

	const handleDeleteClick = () => {
		setNotes(memoNotes.filter(note => note.id !== id))
		notifySuccess("Note deleted!");
	}

    const handleDuplicateClick = () => {
        const date = new Date();
        const duplicateNote = {
            id: nanoid(),
            content: content,
            title: title,
            dateCreated: date.toLocaleDateString(),
            dateMod: date.toLocaleDateString()
        }
		memoNotes.unshift(duplicateNote);
        const updatedNotes = memoNotes.map(note => {return note}) // map to update localStorage
		setNotes(updatedNotes)
		notifySuccess("Note duplicated!");
	}

    return (
        <motion.div className="NoteOptions">
            <IconContext.Provider value={{className: "option-icons" }}>
                
                <motion.div 
                    className="delete-cont option-icon-cont"                             
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}
                    onClick={handleDeleteClick}
                >
                    <BsTrash3Fill className="delete-icon"/>
                    <p className="option-icon-label">Delete</p>
                </motion.div>

                <motion.div 
                    className="favourite-cont option-icon-cont"
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}
                >       
                    <BsStarFill className="favourite-icon"/>
                    <p className="option-icon-label">Favourite</p>
                </motion.div>
                  
                <motion.div 
                    className="duplicate-cont option-icon-cont"
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}
                    onClick={handleDuplicateClick}    
                >
                    <IoDuplicate className="duplicate-icon"/>
                    <p className="option-icon-label">Duplicate</p>
                </motion.div> 

                <motion.div 
                    className="copy-cont option-icon-cont"
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}
                >
                    <BsClipboard2PlusFill className="copy-icon"/>
                    <p className="option-icon-label">Copy</p>
                </motion.div>

                <motion.div 
                    className="move-cont option-icon-cont"
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}
                >
                    <MdDriveFileMoveRtl className="move-icon"/>
                    <p className="option-icon-label">Move</p>
                </motion.div>

            </IconContext.Provider>
        </motion.div>
    )
}

export default memo(NoteOptions)