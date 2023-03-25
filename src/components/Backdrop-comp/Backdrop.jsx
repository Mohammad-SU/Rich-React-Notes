

import './Backdrop.css'
import { motion, AnimatePresence } from 'framer-motion'

export default function Backdrop({className, onClick }) {
    
    return (
            <motion.div
                className={className}
                onClick={onClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
            </motion.div>
    )
}