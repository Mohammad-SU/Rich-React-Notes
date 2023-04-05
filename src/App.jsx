import './index.css'

import { useState, useEffect, useMemo, memo } from 'react'
import { nanoid } from 'nanoid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotesList from "./components/NotesList-comp/NotesList"
import useLocalStorage from "./data/useLocalStorage"
import noteExamples from "./data/noteExamples.json";
import NewNoteBtn from './components/NewNoteBtn-comp/NewNoteBtn'
import Editor from './components/Editor-folder/Editor-comp/Editor'
import Warning from './components/Warning-comp/Warning'

function App() {
	const [notes, setNotes] = useLocalStorage("notesData", noteExamples)

	const memoNotes = useMemo(() => {return notes})

	const [showEditor, setShowEditor] = useState(false)
	const resetEditor = () => {
		document.body.style.overflow = "auto";
		setShowEditor(false)
		setNewlyEdited(false)
		setEditingNote(false)
		setEditorNoteMain("")
		setEditorNoteTitle("")
	}

	const [newlyEdited, setNewlyEdited] = useState(false)
	const handleCloseClick = () => { // If editor has been edited after last opening, show warning if close button is clicked
		if (newlyEdited) {setShowWarning(true)} 
		else {resetEditor()}
	}
	const [showWarning, setShowWarning] = useState(false)
	const handleYesClick = () => {
			resetEditor()
			setShowWarning(false)
	}
	const handleCancelClick = () => {setShowWarning(false)}

	const [editorNoteMain, setEditorNoteMain] = useState("")
	const handleChangeMain = (event, editor) => {
		const data = editor.getData()
        setEditorNoteMain(data)
		setNewlyEdited(true)
    }
	
	let [editorNoteTitle, setEditorNoteTitle] = useState("")
	const handleChangeTitle = (event) => {
        setEditorNoteTitle(event.target.value)
		setNewlyEdited(true)
    }

	const [editingNote, setEditingNote] = useState(false)
	const [matchingNote, setMatchingNote] = useState({})
	const handleNoteClick = (id, text, title) => {
		setEditorNoteMain(text)
		setEditorNoteTitle(title)
		setShowEditor(true)
		setEditingNote(true)
		setMatchingNote(memoNotes.find(note => note.id === id)) // Get note with matching id
	}

	const notify = (notifyText) => toast.success(notifyText, {
		position: "top-center",
		autoClose: 1600,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
	const NewNoteBtnClick = () => {
		if (showEditor && (editorNoteMain != "")) {  // If NewNoteBtn is clicked when editor is open and has text in EditorTextbox, then close editor and save.
			if (!editingNote) {
				const date = new Date();
				if (editorNoteTitle == "") {editorNoteTitle = "Untitled"}
				const newNote = {
					id: nanoid(),
					text: editorNoteMain,
					title: editorNoteTitle,
					dateCreated: date.toLocaleDateString(),
					dateMod: date.toLocaleDateString()
				}
				memoNotes.unshift(newNote) // Add the new note to the start of the notes array
				const updatedNotes = memoNotes.map(note => {return note}) // map to update localStorage
				setNotes(updatedNotes)
				notify("Note added!")
			}
			else if (editingNote && newlyEdited) {

				memoNotes.forEach(function(note,i) { // Add the edited note to the start of the notes array
					if(note.id === matchingNote.id){
						memoNotes.splice(i, 1);
						memoNotes.unshift(note);
					}
				});

				const dateMod = new Date();
				const updatedNotes = memoNotes.map(note => {
					if (note.id === matchingNote.id) { // Check all note elements to find a matching id
						if (editorNoteTitle == "") {editorNoteTitle = "Untitled"}
						return {...note, 
								text: editorNoteMain, 
								title: editorNoteTitle, 
								dateMod: dateMod.toLocaleDateString()
							   } // Change props to match
					}

					return note; // Otherwise return the object as is
				});

				setNotes(updatedNotes);
				notify("Note modified!");
			}

			setEditorNoteMain("") 
			setEditorNoteTitle("")
			setNewlyEdited(false)
			setEditingNote(false)
		}

		setShowEditor(current => !current) // showEditor bool is changed to opposite value each click.
	}
	
	const handleNoteDeleteClick = (id) => {
		setNotes(memoNotes.filter(note => note.id !== id))
		notify("Note deleted!");
	}

	return (
		<div className="App">
			<ToastContainer />
			<div className="main-cont">
				<NotesList 
					notes={memoNotes} 
					onNoteClick={handleNoteClick}
					onNoteDeleteClick={handleNoteDeleteClick}
				/>
				<Editor
					visibleCheck={showEditor}
					titleText={editorNoteTitle} 
					mainText={editorNoteMain} 
					onChangeMain={handleChangeMain}
					onChangeTitle={handleChangeTitle}
					onCloseClick={handleCloseClick}
				/>
				<Warning 
					visibleCheck={showWarning} 
					onYesClick={handleYesClick} 
					onCancelClick={handleCancelClick}
				/>
				<NewNoteBtn onClick={NewNoteBtnClick}/>
			</div>	
		</div>
	)
}

export default memo(App)

	/* TODO:
		Add delete animation on note component
		Add confirmation before deleting note
		Make clicking one NoteOptionsBtn hide other note option menus
		Finish adding option icon scale animation when cont is hovered
		Add animation when opening note options
		Implement useContext	
		Fix source editing editor size
		Note custom colours
		Change css for editor element (background colour)
		Folders, with colours for each
		Search (by note title, text, and/or date),
		Sort - date modified, date created, title, a-z, latest first/latest last
		Dark mode
		Custom note backgrounds?
		Update netlify site after pushing code
	*/