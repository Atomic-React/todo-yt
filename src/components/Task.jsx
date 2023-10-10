import { useContext } from 'react';
import TasksContext from '../contexts/tasks.context';
import { formatDate } from '../utils/date.util';

const Task = ({ name, completed, created_at, id }) => {

	const { updateTask, deleteTask } = useContext(TasksContext);

	return (
		<li className="task-item">
			<div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
				<div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
					<input type="checkbox" checked={ completed } onChange={ (event) => updateTask(id)({ completed: event.target.checked })} />
					{ name }
				</div>
				{ created_at ? <span style={{ fontSize: 12, color: 'gray', marginLeft: '1.5rem'}}>{ formatDate(created_at, 'dd/MM/yyyy at HH:mm') }</span> : null }
			</div>
			<button type="button" onClick={ deleteTask(id) }>Delete</button>
		</li>
	);
};

export default Task;