import React, { Component } from 'react'

class AddTodo extends Component {
	state = {
		content: ''
	}
	handleChange = (e) => {
		this.setState({
			content: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.addTodo(this.state)
		this.setState({ content: '' })
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="ui labeled input">
						<div className="ui label">Enter a new todo :</div>
						<input
							type="text"
							value={this.state.content}
							onChange={this.handleChange}
						/>
					</div>
				</form>
			</div>
		)
	}
}

export default AddTodo
