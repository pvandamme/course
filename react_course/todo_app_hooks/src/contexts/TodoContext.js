import React, { createContext, useReducer } from 'react'
import todoReducer from '../reducers/todoReducer'
import filterReducer from '../reducers/filterReducer'

export const TodoContext = createContext()

const TodoContextProvider = (props) => {
	const [todos, dispatchTodo] = useReducer(todoReducer, [])
	const [filter, dispatchFilter] = useReducer(filterReducer, {
		include: '',
		completed: true
	})

	const applyFilter = () => {
		const todos_include = todos.filter((todo) =>
			todo.text.includes(filter.include)
		)
		return filter.completed
			? todos_include
			: todos_include.filter((todo) => !todo.completed)
	}

	return (
		<TodoContext.Provider
			value={{
				todos: applyFilter(),
				filter,
				dispatchFilter,
				dispatchTodo
			}}>
			{props.children}
		</TodoContext.Provider>
	)
}

export default TodoContextProvider
