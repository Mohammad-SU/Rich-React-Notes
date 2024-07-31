import './index.css'
import { useState, useMemo, memo, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NoteContext } from './context/NoteContext';
import useLocalStorage from "./data/useLocalStorage"
import Search from "./components/Search-comp/Search"
import ResetNotesBtn from "./components/ResetNotesBtn-comp/ResetNotesBtn"
import NotesList from "./components/NotesList-comp/NotesList"
import noteExamples from "./data/noteExamples.json";
import NewNoteBtn from './components/NewNoteBtn-comp/NewNoteBtn'
import Editor from './components/Editor-folder/Editor-comp/Editor'
import Warning from './components/Warning-comp/Warning'

function App() {
	const versionNum = 6; // Update version when noteExamples are changed
	const [version, setVersion] = useLocalStorage("version", 0)

	useEffect(() => {
		if (versionNum > version) { // Cause user's notes to reset to default examples if true
			localStorage.removeItem("version");
			localStorage.removeItem("notesData");
			setVersion(versionNum);
			location.reload();
		}
	}, [versionNum, version])

	const [notes, setNotes] = useLocalStorage("notesData", noteExamples)
	const memoNotes = useMemo(() => {return notes}, [notes])

	const [searchText, setSearchText] = useState("");

	const [showEditor, setShowEditor] = useState(false)
	const resetEditor = () => {
		document.body.style.overflow = "auto";
		setShowEditor(false)
		setNewlyEdited(false)
		setEditingNote(false)
		setEditorNoteContent("")
		setEditorNoteTitle("")
	}

	const [newlyEdited, setNewlyEdited] = useState(false)
	const handleCloseClick = () => { // If editor has been edited after last opening, show warning if close button is clicked
		if (newlyEdited) {setShowWarningEditor(true)} 
		else {resetEditor()}
	}

	const [showWarningEditor, setShowWarningEditor] = useState(false)
	const [showWarningNotes, setShowWarningNotes] = useState(false)
	const handleYesClick = () => {
		if (showWarningNotes) {
			localStorage.removeItem("notesData");
			location.reload();
			setShowWarningNotes(false)
		}
		else if (showWarningEditor) {
			resetEditor()
			setShowWarningEditor(false)
		}
	}
	const handleCancelClick = () => {
		setShowWarningNotes(false)
		setShowWarningEditor(false)
	}

	const [editorNoteContent, setEditorNoteContent] = useState("")
	const handleChangeContent = (event, editor) => { // Do not remove "event" parameter
		const data = editor.getData()
        setEditorNoteContent(data)
		setNewlyEdited(true)
    }
	let [editorNoteTitle, setEditorNoteTitle] = useState("")
	const handleChangeTitle = (event) => {
        setEditorNoteTitle(event.target.value)
		setNewlyEdited(true)
    }

	const [editingNote, setEditingNote] = useState(false)
	const [matchingNote, setMatchingNote] = useState({})
	const handleNoteClick = (id, content, title) => {
		if (disabled) return;
		disableButton()

		setEditorNoteContent(content)
		setEditorNoteTitle(title)
		setShowEditor(true)
		setEditingNote(true)
		setMatchingNote(memoNotes.find(note => note.id === id)) // Get note with matching id
	}

	const notifySuccess = (notifyText) => toast.success(notifyText);
	const notifyInfo = (notifyText) => toast.info(notifyText)

	const convertToPlain = (html) => {
		var tempDivElement = document.createElement("div");
		tempDivElement.innerHTML = html; // Set the HTML content with the given value
		return tempDivElement.textContent || tempDivElement.innerText || ""; // Retrieve the text property of the element
	}

	const [disabled, setDisabled] = useState(false)
	const disableButton = () => {
		setDisabled(true)
		setTimeout(() => {
			setDisabled(false);
		}, 600); // Prevent css breaking from button spamming
	}

	const NewNoteBtnClick = () => {
		if (disabled) return;
		disableButton()

		if (showEditor && editorNoteContent != "") {  // If NewNoteBtn is clicked when editor is open and has content in EditorTextbox, then close editor and save.
			if (!editingNote) {
				const date = new Date();
				if (editorNoteTitle == "") editorNoteTitle = "Untitled"
				const newNote = {
					id: nanoid(),
					content: editorNoteContent,
					searchContent: (convertToPlain(editorNoteContent) + " " + editorNoteTitle + " " + date.toLocaleDateString()),
					title: editorNoteTitle,
					dateCreated: date.toLocaleDateString(),
					dateMod: date.toLocaleDateString()
				}
				memoNotes.unshift(newNote) // Add the new note to the start of the notes array
				const updatedNotes = memoNotes.map(note => {return note}) // map to update localStorage
				setNotes(updatedNotes)
				notifySuccess("Note added!")
			}
			else if (editingNote && newlyEdited) {

				memoNotes.forEach(function(note,i) { // Add the edited note to the start of the notes array
					if(note.id === matchingNote.id) {
						memoNotes.splice(i, 1);
						memoNotes.unshift(note);
					}
				});

				const dateMod = new Date();
				const updatedNotes = memoNotes.map(note => {
					if (note.id === matchingNote.id) { // Check all note elements to find a matching id
						if (editorNoteTitle == "") editorNoteTitle = "Untitled"
						return {...note, 
								content: editorNoteContent,
								searchContent: (convertToPlain(editorNoteContent) + " " + editorNoteTitle + " " + dateMod.toLocaleDateString()), 
								title: editorNoteTitle, 
								dateMod: dateMod.toLocaleDateString()
							   } // Change props to match
					}

					return note; // Otherwise return the object as is
				});

				setNotes(updatedNotes);
				notifySuccess("Note modified!");
			}
			else if (editingNote && !newlyEdited) notifyInfo("No changes to save.")

			setEditorNoteContent("") 
			setEditorNoteTitle("")
			setNewlyEdited(false)
			setEditingNote(false)
		}
		else if (showEditor && editorNoteContent == "") notifyInfo("No content to save.")

		setShowEditor(current => !current) // showEditor bool is changed to opposite value each click.
	}

	return (
		<div className="App">
			<ToastContainer 
				position="top-center"
				autoClose={1600}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="light"
			/>
			<div className="main-cont">
				<div className="top-cont">
					<Search handleSearchNote={setSearchText}/>
					<ResetNotesBtn notifySuccess={notifySuccess} setShowWarningNotes={setShowWarningNotes}/>
				</div>
				<NoteContext.Provider value={{ handleNoteClick, setNotes, memoNotes, notifySuccess, notifyInfo }}>
					<NotesList 
						notes={memoNotes.filter(note => note.searchContent.toLowerCase().includes(searchText.toLowerCase()))}
						searchText={searchText}
					/>
				</NoteContext.Provider>			
				<Editor
					showEditor={showEditor}
					title={editorNoteTitle} 
					content={editorNoteContent} 
					onChangeContent={handleChangeContent}
					onChangeTitle={handleChangeTitle}
					onCloseClick={handleCloseClick}
				/>
				<Warning 
					showWarningEditor={showWarningEditor}
					showWarningNotes={showWarningNotes} 
					onYesClick={handleYesClick} 
					onCancelClick={handleCancelClick}
				/>
				<NewNoteBtn onClick={NewNoteBtnClick} showEditor={showEditor}/>
			</div>	
		</div>
	)
}

export default memo(App)

	/* Update Ideas:
		Add delete animation on note component
		Add recycle bin folder - where notes are truly deleted after a duration of time, or if the user manually does so
		Make clicking one NoteOptionsBtn hide other note option menus
		Multiple selection - can make deleting and duplicating multiple notes easier
		Finish adding option icon scale animation when cont is hovered
		Add animation when opening note options
		Fix source editing editor size
		Note custom colours
		Change css for editor element (background colour)
		Folders, with colours for each
		Sort - date modified, date created, title, a-z, latest first/latest last
		Dark mode
		Custom note backgrounds?
	*/
