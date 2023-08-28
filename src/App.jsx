import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import tasksData from './data/tasks.data.json';
// import Description from './components/Description';
import ToggleThemeButton from './components/ToggleThemeButton';
import ThemeContext from './contexts/theme.context';
import './App.css'
import CreateTaskForm from './components/CreateTaskForm';
import TasksList from './components/TasksList';
import DeleteCompleted from './components/DeleteCompleted';
import { useNotifications } from './contexts/notifications.context';

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

const dummyExpensiveCalculation = (value) => {
	let startTime = performance.now();
	while (performance.now() - startTime < 500) {
		// Do nothing for 500 ms to emulate extremely slow code
	}
	return value;
};

function App() {

	const { theme } = useContext(ThemeContext);

	const [ tasks, setTasks ] = useState(tasksData);
	const [ message, setMessage ] = useState('');
	const [ status, setStatus ] = useState('all');

	const { push } = useNotifications();

	const filteredTasks = useMemo(() => filterTasks(tasks, status), [ tasks, status ]);

	const randomInt = useMemo(() => {
		return Math.floor(Math.random() * 100);
	}, [ message ]);

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
			push({
				message: 'Task created',
				type: 'success',
			});
	}, [ tasks ]);

	const handleDeleteTask = (taskId) => () => {
		setTasks((prevTasks) => {
			return prevTasks.filter((task) => task.id !== taskId)
		});
		push({
			message: 'Task deleted',
			type: 'danger',
		});
	};

	const handleUpdateTask = (taskId) => {
		return (value) => {
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
		}
	};

	const handleDeleteTasksByStatus = useCallback((status) => {
		console.log('handleDeleteTasksByStatus', 'EXPENSIVE CALCULATION');
		dummyExpensiveCalculation(status);
		return () => {
			setTasks((prevTasks) => prevTasks.filter(task => {
				switch (status) {
					case 'completed':
						return !task.completed
					case 'not-completed':
						return task.completed
					default:
						return false
				}
			}));
			push({
				message: 'All tasks deleted',
				type: 'danger',
			});
		};
	}, []);

  return (
    <div className={theme}>
		<div className={`container`}>
			<h1>Todo list</h1>
			<ToggleThemeButton />
			<p>Random number: { randomInt }</p>
			<CreateTaskForm onSubmit={ handleCreateNewTask } message={ message } />
			<div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
				<button type="button" onClick={ () => setStatus('all') }>All</button>
				<button type="button" onClick={ () => setStatus('completed') }>Completed</button>
				<button type="button" onClick={ () => setStatus('not-completed') }>Not completed</button>
				<DeleteCompleted onDeleteCompleted={ handleDeleteTasksByStatus } />
			</div>
			<TasksList tasks={ filteredTasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
		</div>
    </div>
  )
}

export default App
