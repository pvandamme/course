class Hangman {
	constructor(word, remainingGuesses) {
		this.word = word.toLowerCase().split('')
		this.remainingGuesses = remainingGuesses
		this.guessedLetters = []
		this.status = 'playing'
	}
	makeGuess(guess) {
		if (this.status == 'playing') {
			guess = guess.toLowerCase()

			if (!this.guessedLetters.includes(guess)) {
				this.guessedLetters.push(guess)
				if (!this.word.includes(guess)) {
					this.remainingGuesses--
				}
			}
		}
		this.updateStatus()
	}
	updateStatus() {
		if (this.remainingGuesses == 0) {
			this.status = 'failed'
		}
		if (!this.puzzle.includes('*')) {
			this.status = 'finished'
		}
	}
	get puzzle() {
		let puzzle = ''

		this.word.forEach(letter => {
			if (this.guessedLetters.includes(letter) || letter == ' ') {
				puzzle += letter
			} else {
				puzzle += '*'
			}
		})
		return puzzle
	}
	get statusMessage() {
		if (this.status == 'playing') {
			return `Guesses left: ${this.remainingGuesses}`
		}
		else if (this.status == 'failed') {
			return `Nice try ! The word was '${this.word.join('')}'`
		}
		else {
			return 'Great Work ! You guessed the word'
		}
	}
}