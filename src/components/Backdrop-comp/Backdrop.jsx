

import './Backdrop.css'
import { memo } from 'react'
import { motion } from 'framer-motion'

function Backdrop({className, onClick }) {
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

export default memo(Backdrop)