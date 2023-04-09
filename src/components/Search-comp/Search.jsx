import './Search.css'
import { memo } from 'react'
import { GrSearch } from "react-icons/gr"
function Search({ handleSearchNote }) {

    return (
        <div className="Search">
            <GrSearch className="search-icon"/>
            <input 
                className="search-input" 
                type="text" 
                placeholder="Search..."
                maxlength="40000"
                onChange={(event) => 
                    handleSearchNote(event.target.value)
                }
            />
        </div>
    )
}

export default memo(Search)