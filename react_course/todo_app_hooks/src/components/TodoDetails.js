import React, { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'

const TodoDetails = ({ todo }) => {
	const { dispatchTodo } = useContext(TodoContext)

	return (
		<div className="ui segment purple delete">
			<input
				type="checkbox"
				onChange={() => {
					dispatchTodo({ type: 'UPDATE_COMPLETED', id: todo.id })
				}}
				checked={todo.completed}
			/>
			{todo.text}
			<button
				style={{ position: 'absolute', right: '60px' }}
				onClick={() =>
					dispatchTodo({ type: 'REMOVE_TODO', id: todo.id })
				}>
				Delete
			</button>
		</div>
	)
}

export default TodoDetails
