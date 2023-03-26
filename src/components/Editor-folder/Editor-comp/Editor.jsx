import './Editor.css'
import EditorTextbox from '../EditorTextbox-comp/EditorTextbox'
import Backdrop from '../../Backdrop-comp/Backdrop'
import { CgClose } from "react-icons/cg"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Editor({ visibleCheck, titleText, onChangeTitle, mainText, onChangeMain, onCloseClick }) {
    const [isHovering, setIsHovering] = useState(false);
    const closeEnter = () => {
        setIsHovering(true);
    }
    const closeLeave = () => {
        setIsHovering(false);
    }

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
                <div key="EditorKey" >
                    <motion.div 
                        className="Editor"
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div 
                            className="close-editor-button" 
                            onClick={onCloseClick} 
                            onMouseEnter={closeEnter} 
                            onMouseLeave={closeLeave}
                            whileHover={{ scale:1.1 }}
                            whileTap={{ scale:0.9 }}
                        >
                            <CgClose 
                                className="close-editor-icon" 
                                style={{color: isHovering ? "red" : "white"}}
                            />
                        </motion.div>

                        <EditorTextbox
                            titleText={titleText}
                            mainText={mainText} 
                            onChangeMain={onChangeMain}
                            onChangeTitle={onChangeTitle}
                        />
                    </motion.div>

                    <Backdrop id={"bdE"} className={"backdrop"} />
                </div>
            )}
        </AnimatePresence>
    )
}