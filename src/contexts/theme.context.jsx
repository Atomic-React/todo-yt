import { createContext, useState } from 'react';

const ThemeContext = createContext();

export default ThemeContext;

export const ThemeProvider = ({ children }) => {

	const [ theme, setTheme ] = useState('light');

	const toggleTheme = () => {
		setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
	};

	const value = {
		theme,
		toggleTheme,
	};

	return (
		<ThemeContext.Provider value={ value }>
			{ children }
		</ThemeContext.Provider>
	);
}
