const filterReducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_INCLUDE':
			return { ...state, include: action.include }
		case 'UPDATE_COMPLETED':
			return { ...state, completed: !state.completed }
		default:
			return state
	}
}

export default filterReducer
