export const generateUniqueId = () => {
	const randomNumber = Math.floor(Math.random() * 1000000);
	const date = Date.now();
	return `${date}-${randomNumber}`;
};