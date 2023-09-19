import { useContext } from 'react';
import TasksContext from '../contexts/tasks.context';

const Task = ({ name, completed, id }) => {

	const { updateTask, deleteTask } = useContext(TasksContext);

	return (
		<li className="task-item">
			<div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
				<input type="checkbox" checked={ completed } onChange={ (event) => updateTask(id)({ completed: event.target.checked })} />
				{ name }
			</div>
			<button type="button" onClick={ deleteTask(id) }>Delete</button>
		</li>
	);
};

export default Task;