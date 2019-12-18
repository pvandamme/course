const titleDOM = document.querySelector('#note_title')
const bodyDOM = document.querySelector('#note_body')
const id = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(note => {
	return note.id == id
})

if (!note) {
	location.assign('/index.html')
}

titleDOM.value = note.title
bodyDOM.value = note.body

titleDOM.addEventListener('input', e => {
	note.title = e.target.value
	saveNotes()
})

bodyDOM.addEventListener('input', e => {
	note.body = e.target.value
	saveNotes()
})

document.querySelector('#delete_note').addEventListener('click', () => {
	removeNote(id)
	saveNotes()
	location.assign('/index.html')
})

window.addEventListener('storage', e => {
	if (e.key == 'notes') {
		notes = JSON.parse(e.newValue)
		note = notes.find(note => {
			return note.id == id

		})

		if (!note) {
			location.assign('/index.html')

		}

		titleDOM.value = note.title
		bodyDOM.value = note.body
	}
})