import './NoteOptions.css'
import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import { IconContext } from "react-icons"
import { BsTrash3Fill, BsStarFill, BsClipboard2PlusFill } from "react-icons/bs"
import { IoDuplicate } from "react-icons/io5"
import { MdDriveFileMoveRtl } from "react-icons/md"


function NoteOptions() {
    const [isHovering, setIsHovering] = useState(false);
    const optionContEnter = () => {
        setIsHovering(true);
    }
    const optionContLeave = () => {
        setIsHovering(false);
    }

    return (
        <motion.div className="NoteOptions">
            <IconContext.Provider value={{className: "option-icons" }}>
                
                <motion.div 
                    className="delete-cont option-icon-cont"                             
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}
                >
                    <BsTrash3Fill className="delete-icon"/>
                    <p className="option-icon-label">Delete</p>
                </motion.div>

                <motion.div 
                    className="favourite-cont option-icon-cont"
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}
                >       
                    <BsStarFill className="favourite-icon"/>
                    <p className="option-icon-label">Favourite</p>
                </motion.div>
                  
                <motion.div 
                    className="duplicate-cont option-icon-cont"
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}    
                >
                    <IoDuplicate className="duplicate-icon"/>
                    <p className="option-icon-label">Duplicate</p>
                </motion.div> 

                <motion.div 
                    className="copy-cont option-icon-cont"
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}
                >
                    <BsClipboard2PlusFill className="copy-icon"/>
                    <p className="option-icon-label">Copy</p>
                </motion.div>

                <motion.div 
                    className="move-cont option-icon-cont"
                    onMouseEnter={optionContEnter} 
                    onMouseLeave={optionContLeave}
                >
                    <MdDriveFileMoveRtl className="move-icon"/>
                    <p className="option-icon-label">Move</p>
                </motion.div>

            </IconContext.Provider>
        </motion.div>
    )
}

export default memo(NoteOptions)