import { useContext } from 'react';
import ToggleThemeButton from './components/ToggleThemeButton';
import ThemeContext from './contexts/theme.context';
import './App.css'
import CreateTaskForm from './components/CreateTaskForm';
import TasksList from './components/TasksList';
import useLocalStorage from './hooks/useLocalStorage';
import NotificationsContext from './contexts/notifications.context';

function App() {

	const [ tasks, setTasks ] = useLocalStorage('tasks', []);

	const { theme } = useContext(ThemeContext);
	const { push } = useContext(NotificationsContext);

	const handleCreateNewTask = (value) => {
		const maxId = tasks.reduce((max, task) => task.id > max ? task.id : max, 0);
		const newTask = {
			id: maxId + 1,
			name: value,
			completed: false,
		};
		setTasks((prevTasks) => {
			return [ ...prevTasks, newTask ];
		});
		push({
			message: 'Task created',
			type: 'success',
		});
	};
	
	const handleDeleteTask = (taskId) => () => {
		setTasks((prevTasks) => {
			return prevTasks.filter((task) => task.id !== taskId)
		});
		push({
			message: 'Task deleted',
			type: 'danger',
		});
	};

	const handleUpdateTask = (taskId) => (value) => {
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
    <div className={theme} style={{ minHeight: '100vh' }}>
		<div className={`container`}>
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<h1>Todo list</h1>
				<ToggleThemeButton />
			</div>
			<CreateTaskForm onSubmit={ handleCreateNewTask } />
			<TasksList tasks={ tasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
		</div>
    </div>
  )
}

export default App
