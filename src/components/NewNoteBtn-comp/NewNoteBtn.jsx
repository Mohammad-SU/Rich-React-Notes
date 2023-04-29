import './NewNoteBtn.css'
import { memo } from 'react'
import { BsPencilSquare } from "react-icons/bs"
import { FiCheck } from "react-icons/fi" 
import { motion, AnimatePresence } from "framer-motion"

function NewNoteBtn({ onClick, showEditor }) {
    return (
        <motion.button
            className="NewNoteBtn" 
            onClick={onClick}
            layout="position"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <AnimatePresence mode="wait">
                {showEditor ?
                    <motion.span
                        className="newNoteBtn-motion-span"
                        key={"FiCheck-span"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    > 
                        <FiCheck 
                            size="3.8em" 
                            color="white"
                        />
                    </motion.span> 
                    : 
                    <motion.span
                        className="newNoteBtn-motion-span"
                        key={"BsPencilSquare-span"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <BsPencilSquare 
                            size="3em" 
                            color="white"
                        />
                    </motion.span>
                }
            </AnimatePresence>
        </motion.button>
    )
}

export default memo(NewNoteBtn)