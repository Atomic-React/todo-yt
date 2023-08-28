import { useCallback, useContext, useEffect, useState } from 'react';
import tasksData from './data/tasks.data.json';
// import Description from './components/Description';
import ToggleThemeButton from './components/ToggleThemeButton';
import ThemeContext from './contexts/theme.context';
import './App.css'
import CreateTaskForm from './components/CreateTaskForm';
import TasksList from './components/TasksList';

const filterTasks = (tasks, status) => {
	let startTime = performance.now();
	while (performance.now() - startTime < 500) {
		// Do nothing for 500 ms to emulate extremely slow code
	}
	return tasks.filter(task => {
		switch (status) {
			case 'completed':
				return task.completed
			case 'not-completed':
				return !task.completed
			default:
				return true
		}
	});
};

function App() {

	const { theme } = useContext(ThemeContext);

	const [ tasks, setTasks ] = useState(tasksData);
	const [ message, setMessage ] = useState('');
	const [ status, setStatus ] = useState('all');

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMessage('');
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [ message ]);

	const handleCreateNewTask = useCallback((value) => () => {
			const maxId = tasks.reduce((max, task) => task.id > max ? task.id : max, 0);
			const newTask = {
				id: maxId + 1,
				name: value,
				completed: false,
			};
			setTasks((prevTasks) => {
				return [ ...prevTasks, newTask ];
			});
			setMessage('Task created');
	}, [ tasks ]);
	
	const handleDeleteTask = (taskId) => () => {
		setTasks((prevTasks) => {
			return prevTasks.filter((task) => task.id !== taskId)
		});
		setMessage('Task deleted');
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
		setMessage('Task updated');
	};

  return (
    <div className={theme}>
		<div className={`container`}>
			<h1>Todo list</h1>
			<ToggleThemeButton />
			<CreateTaskForm onSubmit={ handleCreateNewTask } message={ message } />
			<div>
				<button onClick={ () => setStatus('all') }>All</button>
				<button onClick={ () => setStatus('completed') }>Completed</button>
				<button onClick={ () => setStatus('not-completed') }>Not completed</button>
			</div>
			<TasksList tasks={ tasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
		</div>
    </div>
  )
}

export default App
