import './Editor.css'
import FormatToolbar from './FormatToolbar/FormatToolbar.jsx'

export default function Editor() {
    return (
        <div>
            <div className="Editor">
                <FormatToolbar />
                Text here
            </div>
        </div>
    )
}