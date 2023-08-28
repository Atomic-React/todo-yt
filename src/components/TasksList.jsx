import { memo } from 'react';
import Task from './Task';

const TasksList = ({ tasks, onUpdateTask, onDeleteTask }) => {

	// console.log('RENDER TasksList');

	return (
		<div>
			<ul className="tasks-list">
				{
					tasks.map((task) => (
						<Task key={task.id} { ...task } onUpdate={ onUpdateTask(task.id) } onDelete={ onDeleteTask } />
					))
				}
			</ul>
		</div>
	);
};

export default memo(TasksList, (prevProps, nextProps) => {
	if (JSON.stringify(prevProps.tasks) !== JSON.stringify(nextProps.tasks)) {
		return false;
	}
	return true;
});