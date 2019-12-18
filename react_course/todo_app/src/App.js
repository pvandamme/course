import React, { Component } from 'react'
import Todos from './Todos'
import AddTodo from './AddTodo'

class App extends Component {
	state = {
		todos: [
			{ id: 1, content: 'Manger' },
			{ id: 2, content: 'Voir Louise' }
		]
	}
	deleteTodo = (id) => {
		const todos = this.state.todos.filter((todo) => todo.id !== id)
		this.setState({ todos })
	}
	addTodo = (todo) => {
		todo.id = Math.random()
		this.setState({
			todos: [...this.state.todos, todo]
		})
	}
	render() {
		return (
			<div className="ui container" style={{ paddingTop: '30px' }}>
				<Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
				<AddTodo addTodo={this.addTodo} />
			</div>
		)
	}
}

export default App
