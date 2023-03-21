import './index.css'
import { useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList-comp/NotesList"
import NewNoteBtn from './components/NewNoteBtn-comp/NewNoteBtn'
import Editor from './components/Editor-comp/Editor/Editor.jsx'

export default function App() {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: "Note 1",
			title: "Title 1",
			date: "13/03/2023",
		},
		{
			id: nanoid(),
			text: "Note 2",
			title: "Title 2",
			date: "13/03/2023",
		},
		{
			id: nanoid(),
			text: "Note 3",
			title: "Title 3",
			date: "13/03/2023",
		},
		{
			id: nanoid(),
			text: "Note 4",
			title: "Title 4",
			date: "13/03/2023",
		},
	]);

	const [showEditor, setShowEditor] = useState(false)

	const [editorNoteMain, setEditorNoteMain] = useState("")
	const handleChangeMain = (event) => {
        setEditorNoteMain(event.target.value)
    }

	let [editorNoteTitle, setEditorNoteTitle] = useState("")
	const handleChangeTitle = (event) => {
        setEditorNoteTitle(event.target.value)
    }

	const NewNoteBtnClick = () => {
		if (showEditor && (editorNoteMain != "")) {  // If NewNoteBtn is clicked when editor is open and has text in EditorTextbox, then close editor and save note.
			const date = new Date();
			if (editorNoteTitle == "") {editorNoteTitle = "Untitled"}
			const newNote = {
				id: nanoid(),
				text: editorNoteMain,
				title: editorNoteTitle,
				date: date.toLocaleDateString()
			}
			const addedNote = [newNote, ...notes] // Adds the new note to an array with the current notes
			setNotes(addedNote)
			setEditorNoteMain("") // Reset editor main text
			setEditorNoteTitle("") // Reset editor title text
		}

		setShowEditor(!showEditor) // showEditor bool is changed to opposite value each click.
	}
	
	const handleNoteClick = (event) => {
		setEditorNoteMain(event.target.textContent)
		setEditorNoteTitle(event.target.nextSibling.childNodes[0].textContent)
		setShowEditor(true)
	}


	return (
		<div className="App">
			<div className="main-cont">
				<NotesList 
					notes={notes} 
					onNoteClick={handleNoteClick}
				/>
				{showEditor ?
					<Editor 
						valueMain={editorNoteMain} 
						onChangeMain={handleChangeMain}
						valueTitle={editorNoteTitle}
						onChangeTitle={handleChangeTitle}
					/> 
				:null /*Show/hide Editor*/}
				<NewNoteBtn onClick={NewNoteBtnClick}/>
			</div>
			{showEditor? <div className="overlay-cont"></div> :null /*Prevent click events behind Editor*/}
		</div>
	)
}

	/* TODO:
		newNotebtn change to a tick when editor is open
		Functionality for editor close button
		Warning if close editor whithout saving edit
		Markdown + more buttons (text colour, code blocks, font size? zoom out from text by decreasing font size)
		Folders, with colours for each
		Search (by note title, text, and/or date)
		Make notes save to local storage
		Add extra options below note:
			Delete, Duplicate, Copy, Favourites
		Dark mode
		Custom note backgrounds/insert image
	*/