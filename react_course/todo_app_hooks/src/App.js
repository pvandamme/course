import React from 'react'
import Navbar from './components/Navbar'
import TodoContextProvider from './contexts/TodoContext'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import FilterTodo from './components/FilterTodo'

function App() {
	return (
		<div className="ui container segment" style={{ marginTop: '30px' }}>
			<TodoContextProvider>
				<Navbar />
				<FilterTodo />
				<TodoList />
				<TodoForm />
			</TodoContextProvider>
		</div>
	)
}

export default App
