

import './Backdrop.css'
import { motion, AnimatePresence } from 'framer-motion'

export default function Backdrop({ id, className, onClick }) {
    
    return (
            <motion.div
                key={id}
                className={className}
                onClick={onClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
            </motion.div>
    )
}