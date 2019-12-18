const search = document.querySelector('input')
const one = document.querySelector('#one')
const two = document.querySelector('#two')

document.querySelector('form').addEventListener('submit', (e) => {
	e.preventDefault()

	one.textContent = 'Loading...'
	two.textContent = ''

	fetch('http://localhost:8080/weather?adress=' + search.value).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				one.textContent = data.error
			} else {
				one.textContent = data.location
				two.textContent = data.forecast
			}
		})
	})
})