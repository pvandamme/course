import React, { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'
import TodoDetails from './TodoDetails'

const TodoList = () => {
	const { todos } = useContext(TodoContext)

	return todos.length ? (
		todos.map((todo) => {
			return <TodoDetails todo={todo} key={todo.id} />
		})
	) : (
		<p>No todo ! :)</p>
	)
}

export default TodoList
