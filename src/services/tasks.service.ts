import tasksData from '../data/tasks.data.json';

export const getTasks = () => new Promise((resolve, reject) => {
    setTimeout(() => {
		resolve(tasksData);
	}, 1000);
});
