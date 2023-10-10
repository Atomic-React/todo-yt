import { useContext } from 'react';
import TasksContext from '../contexts/tasks.context';

const useTasks = () => {
	const context = useContext(TasksContext);
	if (!context) {
		throw new Error('useTasks must be used within a TasksContextProvider');
	}
	return context;
}

export default useTasks;