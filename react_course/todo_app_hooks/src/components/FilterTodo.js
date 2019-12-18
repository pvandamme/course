import React, { useContext } from 'react'
import { TodoContext } from '../contexts/TodoContext'

const FilterTodo = () => {
	const { dispatchFilter } = useContext(TodoContext)

	return (
		<div>
			<input
				type="checkbox"
				onChange={() => dispatchFilter({ type: 'UPDATE_COMPLETED' })}
			/>
			<input
				className="ui input"
				type="text"
				placeholder="Search..."
				onChange={(e) =>
					dispatchFilter({
						type: 'UPDATE_INCLUDE',
						include: e.target.value
					})
				}
			/>
		</div>
	)
}

export default FilterTodo
