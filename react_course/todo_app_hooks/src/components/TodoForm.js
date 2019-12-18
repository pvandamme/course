import React, { useState, useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'

const TodoForm = () => {
	const { dispatchTodo } = useContext(TodoContext)
	const [text, setText] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatchTodo({ type: 'ADD_TODO', text })
		setText('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Add todo..."
				onChange={(e) => setText(e.target.value)}
				value={text}
				required
				className="ui input"></input>
			<input className="ui button" type="submit" value="add todo" />
		</form>
	)
}

export default TodoForm
