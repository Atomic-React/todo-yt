const CreateTaskForm = ({ onSubmit }) => {

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const name = formData.get('name');
		onSubmit(name);
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