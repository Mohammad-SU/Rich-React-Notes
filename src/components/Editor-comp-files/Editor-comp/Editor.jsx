import './Editor.css'
import FormatToolbar from '../FormatToolbar-comp/FormatToolbar'
import EditorTextbox from '../EditorTextbox-comp/EditorTextbox'
import Backdrop from '../../Backdrop-comp/Backdrop'
import { CgClose } from "react-icons/cg"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Editor({ visibleCheck, valueMain, onChangeMain, valueTitle, onChangeTitle, onCloseClick }) {
    const [isHovering, setIsHovering] = useState(false);
    const closeEnter = () => {
        setIsHovering(true);
    }
    const closeLeave = () => {
        setIsHovering(false);
    }

    return (
        <AnimatePresence>
            {visibleCheck &&
                <div>
                    <div className="Editor">
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

                        <FormatToolbar />

                        <EditorTextbox 
                            valueMain={valueMain} 
                            onChangeMain={onChangeMain}
                            valueTitle={valueTitle}
                            onChangeTitle={onChangeTitle}
                        />
                    </div>

                    <Backdrop id={"bdE"} className={"backdrop"} />
                </div>}
        </AnimatePresence>
    )
}