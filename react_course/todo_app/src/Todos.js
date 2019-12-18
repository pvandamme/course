import React from 'react'

const todos = ({ todos, deleteTodo }) => {
	if (todos.length) {
		return todos.map((todo) => {
			return (
				<div
					className="ui purple segment"
					key={todo.id}
					onClick={() => {
						deleteTodo(todo.id)
					}}>
					<p>{todo.content}</p>
				</div>
			)
		})
	} else {
		return <p>No todo !</p>
	}
}

export default todos
