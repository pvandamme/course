const todos = getSavedTodos()

const filters = {
	text: '',
	hide_completed: false
}

document.querySelector('#search_text').addEventListener('input', () => {
	filters.text = document.querySelector('#search_text').value
	renderTodos(todos, filters)
})

document.querySelector('#form_id').addEventListener('submit', (e) => {
	e.preventDefault()

	if (e.target.todo_text.value) {
		todos.push({
			id: uuidv4(),
			text: e.target.todo_text.value,
			completed: false
		})
	}

	saveTodos(todos)

	renderTodos(todos, filters)

	e.target.todo_text.value = ''
})

document.querySelector('#hide_completed').addEventListener('change', (e) => {
	filters.hide_completed = e.target.checked
	renderTodos(todos, filters)
})

renderTodos(todos, filters)
