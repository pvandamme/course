import React, { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'

const Navbar = () => {
	const { todos } = useContext(TodoContext)
	return (
		<div className="ui blue centered header">
			<h1>TODO APP</h1>
			<h2>You have {todos.length} left !</h2>
		</div>
	)
}

export default Navbar
