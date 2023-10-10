import { useContext } from 'react';
import ToggleThemeButton from './components/ToggleThemeButton';
import ThemeContext from './contexts/theme.context';
import './App.css'
import CreateTaskForm from './components/CreateTaskForm';
import TasksList from './components/TasksList';
import { TasksContextProvider } from './contexts/tasks.context';

function App() {

	const { theme } = useContext(ThemeContext);

	return (
		<div className={theme} style={{ minHeight: '100vh' }}>
			<div className={`container`}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<h1>Todo list</h1>
					<ToggleThemeButton />
				</div>
				<div style={{ marginBottom: '2rem' }}>
					<h2 style={{ color: 'tomato' }}>Breakpoint: {screen}</h2>
				</div>
				<TasksContextProvider>
				<CreateTaskForm />
					<TasksList />
				</TasksContextProvider>
			</div>
		</div>
	);
}

export default App;
