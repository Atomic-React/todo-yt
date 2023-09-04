import { useState, useCallback } from 'react';
import { isFunction } from '../utils/func.util';

const useLocalStorage = (key, initialValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	});

	const setValue = useCallback(
		value => {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(isFunction(value) ? value(storedValue) : value));
		},
		[ key, storedValue ]
	);

	return [storedValue, setValue];
};

export default useLocalStorage;