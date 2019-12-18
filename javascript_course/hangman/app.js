const puzzle = document.querySelector('#puzzle')
const status = document.querySelector('#status')
const game1 = new Hangman(`Je t'aime`, 10)

puzzle.textContent = game1.puzzle
status.textContent = game1.statusMessage

window.addEventListener('keypress', (e) => {
	game1.makeGuess(e.key)
	puzzle.textContent = game1.puzzle
	status.textContent = game1.statusMessage
})

getPuzzle(2).then((puzzle) => {
	console.log(puzzle)
}, (err) => {
	console.log(`Error: ${err}`)
})