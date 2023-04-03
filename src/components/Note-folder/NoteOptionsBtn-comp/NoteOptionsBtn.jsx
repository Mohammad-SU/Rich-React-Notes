import './NoteOptionsBtn.css'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { BsThreeDots } from "react-icons/bs"

function NoteOptionsBtn({ onClick }) {  
    return (
        <motion.div 
            className="NoteOptionsBtn"
            onClick={onClick}
            whileHover={{ scale:1.1 }}
            whileTap={{ scale:0.9 }}
        >
            <BsThreeDots className="NoteOptionsBtn-icon"/>
        </motion.div>
    )
}

export default memo(NoteOptionsBtn)