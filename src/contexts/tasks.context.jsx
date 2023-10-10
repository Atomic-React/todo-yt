import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import NotificationsContext from './notifications.context';

const TasksContext = createContext(null);

export default TasksContext;

const TasksContextProvider = ({ children }) => {

	const [ tasks, setTasks ] = useLocalStorage('tasks', []);

	const { push } = useContext(NotificationsContext);

	const createTask = (value) => {
		const maxId = tasks.reduce((max, task) => task.id > max ? task.id : max, 0);
		const newTask = {
			id: maxId + 1,
			name: value,
			completed: false,
			created_at: new Date(),
		};
		setTasks((prevTasks) => {
			return [ ...prevTasks, newTask ];
		});
		push({
			message: 'Task created',
			type: 'success',
		});
	};

	const deleteTask = (taskId) => () => {
		setTasks((prevTasks) => {
			return prevTasks.filter((task) => task.id !== taskId)
		});
		push({
			message: 'Task deleted',
			type: 'danger',
		});
	};

	const updateTask = (taskId) => (value) => {
		setTasks((prevTasks) => prevTasks.map(task => {
			if (task.id === taskId) {
				return {
					...task,
					...value,
				}
			}
			return task;
		}));
		push({
			message: 'Task updated',
			type: 'info',
		});
	};

	return (
		<TasksContext.Provider value={{
			tasks,
			updateTask,
			deleteTask,
			createTask,
		}}>
			{ children }
		</TasksContext.Provider>
	);
};

export { TasksContextProvider };