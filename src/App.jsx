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
		<TasksContextProvider>
			<div className={theme} style={{ minHeight: '100vh' }}>
				<div className={`container`}>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<h1>Todo list</h1>
						<ToggleThemeButton />
					</div>
					<CreateTaskForm />
					<TasksList />
				</div>
			</div>
		</TasksContextProvider>
	);
}

export default App
