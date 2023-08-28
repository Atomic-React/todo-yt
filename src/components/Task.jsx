const Task = ({ name, completed, onUpdate, onDelete, id }) => {

	return (
		<li className="task-item">
			<div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
				<input type="checkbox" checked={ completed } onChange={ (event) => onUpdate({ completed: event.target.checked })} />
				{ name }
			</div>
			<button type="button" onClick={ onDelete(id) }>Delete</button>
		</li>
	);
};

export default Task;