import './index.css'

import { useState, useEffect, useMemo, memo } from 'react'
import { nanoid } from 'nanoid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotesList from "./components/NotesList-comp/NotesList"
import NewNoteBtn from './components/NewNoteBtn-comp/NewNoteBtn'
import Editor from './components/Editor-folder/Editor-comp/Editor'
import Warning from './components/Warning-comp/Warning'

function App() {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: "Note 1",
			title: "Title 1",
			dateCreated: "13/03/2023",
			dateMod: "13/03/2023",
		},
		{
			id: nanoid(),
			text: "Note 2",
			title: "Title 2",
			dateCreated: "13/03/2023",
			dateMod: "13/03/2023",
		},
		{
			id: nanoid(),
			text: "Note 3",
			title: "Title 3",
			dateCreated: "13/03/2023",
			dateMod: "13/03/2023",
		},
		{
			id: nanoid(),
			text: "Note 4",
			title: "Title 4",
			dateCreated: "13/03/2023",
			dateMod: "13/03/2023",
		},
	]);

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
				notify("Note added!");
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

	useEffect(() => {
			const noteFigureCenter = document.querySelectorAll(".note-main-area > figure"); // For fixing center images
			noteFigureCenter.forEach((figure) => {
				if (!figure.classList.contains("image-style-side")) {// If the image has figure element but is not image-style-side class,
					figure.classList.add("image-style-center")       // Then add this class
				}
			})

			const ul_lists = document.querySelectorAll(".note-main-area > ul")
		
			ul_lists.forEach((ul) => {
				if (!ul.classList.contains("todo-list")) {
					ul.classList.add("normal-ul-list")
				}
			})
		})
	
	return (
		<div className="App">
			<ToastContainer />
			<div className="main-cont">
				<NotesList notes={memoNotes} onNoteClick={handleNoteClick}/>
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
		Test app memo 
		editor toolbar custom colours (lime, light blue, etc)
		Change css for editor element (background colour ckeditor)
		Folders, with colours for each
		Search (by note title, text, and/or date),
		Sort? date modified, date created, title, a-z, latest first/latest last
		Make notes save to local storage
		Add extra options below note: + animation for it
			Delete, Duplicate, Copy, Favourites, Pin
		Dark mode
		Custom note backgrounds?
	*/