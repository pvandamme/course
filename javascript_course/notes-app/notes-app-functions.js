function getSavedNotes() {
	const saved_notes = localStorage.getItem('notes')

	if (saved_notes)
		return JSON.parse(saved_notes)
	else
		return []
}

function saveNotes() {
	localStorage.setItem('notes', JSON.stringify(notes))
}

function removeNote(id) {
	index = notes.findIndex(note => {
		return note.id == id
	})
	notes.splice(index, 1)
}

function generateNoteDOM(note) {
	const container = document.createElement('div')
	const button = document.createElement('button')
	const text = document.createElement('a')

	text.setAttribute('href', `/edit.html#${note.id}`)
	if (note.title) {
		text.textContent = note.title
	}
	else {
		text.textContent = 'Empty'
	}

	button.textContent = 'x'
	button.addEventListener('click', () => {
		removeNote(note.id)
		saveNotes()
		renderNotes()
	})

	container.appendChild(button)
	container.appendChild(text)
	document.querySelector('#notes').appendChild(container)
}

function renderNotes() {
	filtered_notes = notes.filter(note => {
		return note.title.toLowerCase().includes(filters.search_text.toLowerCase())
	})

	document.querySelector('#notes').innerHTML = ''

	filtered_notes.forEach(note => {
		generateNoteDOM(note)
	})
}