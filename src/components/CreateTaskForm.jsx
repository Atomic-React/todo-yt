import useTasks from '../hooks/useTasks';

const CreateTaskForm = () => {

	const { createTask } = useTasks();

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const name = formData.get('name');
		createTask(name);
		event.target.reset();
	};

	return (
		<div>
			<form onSubmit={ handleSubmit }>
				<input type="text" name="name" placeholder="Task name"/>
				<button>Add</button>
			</form>
		</div>
	);
};

export default CreateTaskForm;