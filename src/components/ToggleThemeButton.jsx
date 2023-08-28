import { useContext } from 'react';
import ThemeContext from '../contexts/theme.context';

const ToggleThemeButton = () => {
	const { toggleTheme } = useContext(ThemeContext);
	return (
		<button onClick={toggleTheme}>
			Toggle Theme
		</button>
	);
}

export default ToggleThemeButton;