import { useContext } from 'react';
import TasksContext from '../contexts/tasks.context';
import Task from './Task';

const TasksList = () => {

	const { tasks } = useContext(TasksContext);

	return (
		<div>
			<ul className="tasks-list">
				{
					tasks.map((task) => (
						<Task key={task.id} { ...task } />
					))
				}
			</ul>
		</div>
	);
};

export default TasksList;