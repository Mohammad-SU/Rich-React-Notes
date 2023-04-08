import './NoteOptionsToggle.css'
import { memo } from 'react'
import { motion } from 'framer-motion'
import { BsThreeDots } from "react-icons/bs"

function NoteOptionsToggle({ onClick }) {  
    return (
        <motion.div 
            className="NoteOptionsToggle"
            onClick={onClick}
            whileHover={{ scale:1.1 }}
            whileTap={{ scale:0.9 }}
        >
            <BsThreeDots className="NoteOptionsToggle-icon"/>
        </motion.div>
    )
}

export default memo(NoteOptionsToggle)