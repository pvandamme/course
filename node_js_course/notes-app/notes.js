const fs = require('fs')
const chalk = require('chalk')

const saveNotes = (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes))

const loadNotes = () => {
	try {
		const data = fs.readFileSync('notes.json').toString()
		return JSON.parse(data)
	} catch (e) {
		return []
	}
}

const addNote = (title, body) => {
	const notes = loadNotes()
	const found = notes.some((e) => e.title === title)

	if (!found) {
		notes.push({
			title: title,
			body: body
		})
		console.log(chalk.green.inverse('New note created !'))
	} else {
		console.log(chalk.red.inverse('Title already taken !'))
	}

	saveNotes(notes)
}

const removeNote = (title) => {
	const notes = loadNotes()
	const newNotes = notes.filter((note) => note.title !== title)

	if (newNotes.length < notes.length) {
		console.log(chalk.green.inverse('Notes removed !'))
		saveNotes(newNotes)
	} else {
		console.log(chalk.red.inverse('No note found !'))
	}
}

const listNotes = () => {
	notes = loadNotes()
	console.log(chalk.green('Your notes :\n'))
	notes.forEach(note => {
		console.log(note.title)
	});
}

const getNotes = (title) => {
	notes = loadNotes()
	const found = notes.find((e) => e.title === title)

	if (found) {
		console.log(chalk.green('Title : ') + found.title)
		console.log(chalk.green('Body : ') + found.body)
	} else {
		console.log(chalk.red.inverse('No note found !'))
	}
}

module.exports = {
	getNotes: getNotes,
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes
}