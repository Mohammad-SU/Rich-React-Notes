import './NewNoteBtn.css'
import { memo } from 'react'
import { BsPencilSquare } from "react-icons/bs"
import { motion } from "framer-motion"

function NewNoteBtn({ onClick }) {
    return (
        <motion.button
            className="NewNoteBtn" 
            onClick={onClick}
            layout="position"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <BsPencilSquare size="3em" color="white"/>
        </motion.button>
    )
}

export default memo(NewNoteBtn)