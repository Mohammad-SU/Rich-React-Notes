import "./Warning.css"
import Backdrop from '../Backdrop-comp/Backdrop'
import { motion, AnimatePresence } from "framer-motion"
import { AiFillWarning } from "react-icons/ai"

export default function Warning({ visibleCheck, onYesClick, onCancelClick }) {
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity: "0"
        },
        visible: {
            y: "0",
            opacity: "1",
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness: 300
            }
        },
        exit: {
            y: "-100vh"
        }
    }

    return (
        <AnimatePresence>
            {visibleCheck && (
                <div key="WarningKey">
                    <motion.div
                        className="Warning"
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <AiFillWarning className="warning-icon" size="3em"/>
                        <h4 className="warning-text">Are you sure you want to close the editor without saving?</h4>
                        <motion.button 
                            className="yes-btn options" 
                            onClick={onYesClick}
                            whileHover={{ scale:1.1 }}
                            whileTap={{ scale:0.9 }}
                        >
                            Yes
                        </motion.button>
                        <motion.button 
                            className="cancel-btn options" 
                            onClick={onCancelClick}
                            whileHover={{ scale:1.1 }}
                            whileTap={{ scale:0.9 }}
                        >
                            Cancel
                        </motion.button>
                    </motion.div>

                    <Backdrop className={"backdrop warning-backdrop"} onClick={onCancelClick}/>
                </div>
            )}
        </AnimatePresence>
    )
}