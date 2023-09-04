import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ToggleThemeButton from './components/ToggleThemeButton';
import ThemeContext from './contexts/theme.context';
import './App.css'
import CreateTaskForm from './components/CreateTaskForm';
import TasksList from './components/TasksList';
import DeleteCompleted from './components/DeleteCompleted';
import useLocalStorage from './hooks/useLocalStorage';

const filterTasks = (tasks, status) => {
	let startTime = performance.now();
	while (performance.now() - startTime < 1000) {
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

const dummyExpensiveCalculation = () => {
	let startTime = performance.now();
	while (performance.now() - startTime < 1000) {
		// Do nothing to emulate extremely slow code
	}
	return;
}

function App() {

	const { theme } = useContext(ThemeContext);

	// const [ tasks, setTasks ] = useState(tasksData);
	const [ tasks, setTasks ] = useLocalStorage('tasks', []);
	const [ message, setMessage ] = useState('');
	const [ status, setStatus ] = useState('all');

	const randomInt = useMemo(() => {
		return Math.floor(Math.random() * 100);
	}, []);
	// Tableau de dépendances vide => conserve la valeur initiale

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
	}, [ tasks, setTasks ]);
	
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

	const filteredTasks = useMemo(() => filterTasks(tasks, status), [ tasks, status ]);

	const handleDeleteTasksByStatus = useCallback((status) => {
		console.log('HANDLE DELETE TASKS');
		dummyExpensiveCalculation();
		return () => {
			setTasks((prevTasks) => prevTasks.filter(task => {
				switch (status) {
					case 'completed':
						return !task.completed;
					case 'not-completed':
						return task.completed;
					default:
						return false;
				}
			}))
		}
	}, [ setTasks ]);

  return (
    <div className={theme}>
		<div className={`container`}>
			<h1>Todo list</h1>
			<p>Random integer: { randomInt }</p>
			<ToggleThemeButton />
			<CreateTaskForm onSubmit={ handleCreateNewTask } message={ message } />
			<div style={{ display: 'flex', gap: 8 }}>
				<button onClick={ () => setStatus('all') }>All</button>
				<button onClick={ () => setStatus('completed') }>Completed</button>
				<button onClick={ () => setStatus('not-completed') }>Not completed</button>
				<DeleteCompleted onDeleteCompleted={ handleDeleteTasksByStatus } />
			</div>
			<TasksList tasks={ filteredTasks } onDeleteTask={ handleDeleteTask } onUpdateTask={ handleUpdateTask } />
		</div>
    </div>
  )
}

export default App
