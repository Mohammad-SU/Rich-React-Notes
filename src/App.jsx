import './index.css'
import { useState } from 'react';
import { nanoid } from 'nanoid';
import NotesList from "./components/NotesList"
import NewNoteBtn from './components/NewNoteBtn'

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

	return (
		<div className="App">
			<div className="main-cont">
				<NotesList notes={notes}/>
				<NewNoteBtn />
			</div>
		</div>
	)
}

