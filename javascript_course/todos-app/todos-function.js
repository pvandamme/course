function getSavedTodos() {
	const todos_json = localStorage.getItem('todos')

	if (todos_json) {
		return JSON.parse(todos_json)
	}
	else {
		return []
	}
}

function saveTodos(todos) {
	localStorage.setItem('todos', JSON.stringify(todos))
}

function removeTodo(todo_id) {
	const todo_index = todos.findIndex(todo => {
		return todo.id == todo_id
	})	
	todos.splice(todo_index, 1)
}

function updateCompleted(todo_id) {
	const todo = todos.find(todo => {
		return todo.id == todo_id
	})	
	todo.completed = !todo.completed
}

function generateTodoDOM(todo) {
	const container = document.createElement('div')
	const todos_text = document.createElement('span')
	const checkbox = document.createElement('input')
	const button = document.createElement('button')

	todos_text.textContent = todo.text	
	button.textContent = 'x'

	checkbox.setAttribute('type', 'checkbox')
	checkbox.checked = todo.completed;

	container.appendChild(checkbox)
	container.appendChild(todos_text)
	container.appendChild(button)

	button.addEventListener('click', () => {
		removeTodo(todo.id)
		saveTodos(todos)
		renderTodos(todos, filters)
	})

	checkbox.addEventListener('change', () => {
		updateCompleted(todo.id)
		saveTodos(todos)
		renderTodos(todos, filters)
	})

	return container
}

function generateSummaryDOM(imcomplete_todos) {
	const summary = document.createElement('h2')
	summary.textContent = `You have ${imcomplete_todos} todos left`
	document.querySelector('#todos_div').appendChild(summary)
}

function renderTodos(todos, filters) {
	let filtered_todos = todos.filter(todo => {
		const search_text_match = todo.text.toLowerCase().includes(filters.text.toLowerCase())
		const hide_completed_match = !filters.hide_completed || !todo.completed

		return search_text_match && hide_completed_match
	})

	let imcomplete_todos = filtered_todos.filter(todo => {
		return !todo.completed
	}).length

	document.querySelector('#todos_div').innerHTML = ''

	generateSummaryDOM(imcomplete_todos)

	filtered_todos.forEach(todo => {
		document.querySelector('#todos_div').appendChild(generateTodoDOM(todo))
	})
}