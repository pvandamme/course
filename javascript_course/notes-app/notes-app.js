let notes = getSavedNotes()

const filters = {
	search_text: ''
}

document.querySelector('#create_note').addEventListener('click', () => {
	const id = uuidv4()

	notes.push({
		id: id,
		title: '',
		body: ''
	})
	saveNotes()
	renderNotes()
	location.assign(`/edit.html#${id}`)
})

document.querySelector('#search_text').addEventListener('input', () => {
	filters.search_text = document.querySelector('#search_text').value
	renderNotes()
})

window.addEventListener('storage', e => {
	if (e.key == 'notes') {
		notes = JSON.parse(e.newValue)
		renderNotes()
	}
})

const date = Date.now()
console.log(date)
renderNotes()