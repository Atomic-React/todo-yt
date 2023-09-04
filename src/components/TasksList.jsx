import { memo } from 'react';
import Task from './Task';

const TasksList = ({ tasks, onUpdateTask, onDeleteTask }) => {

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
	return JSON.stringify(prevProps.tasks) === JSON.stringify(nextProps.tasks);
});