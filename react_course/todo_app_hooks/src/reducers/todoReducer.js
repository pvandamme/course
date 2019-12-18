import uuid from 'uuid/v4'

const todoReducer = (state, action) => {
	switch (action.type) {
		case 'REMOVE_TODO':
			return state.filter((todo) => todo.id !== action.id)
		case 'ADD_TODO':
			return [
				...state,
				{
					text: action.text,
					completed: false,
					id: uuid()
				}
			]
		case 'UPDATE_COMPLETED':
			return state.map((todo) =>
				todo.id === action.id
					? { ...todo, completed: !todo.completed }
					: todo
			)
		default:
			return state
	}
}

export default todoReducer
