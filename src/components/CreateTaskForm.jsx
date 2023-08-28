import { memo, useState } from 'react';

const CreateTaskForm = ({ message, onSubmit }) => {

	const [ value, setValue ] = useState('');

	console.log('RENDER CreateTaskForm');

	return (
		<div>
			<form>
				<input type="text" name="name" placeholder="Task name" value={ value } onChange={ (event) => setValue(event.target.value) } />
				<button type="button" onClick={ onSubmit(value) }>Add</button>
			</form>
			{ message && <p style={{ color: 'green' }}>{ message }</p> }
		</div>
	);
};

export default memo(CreateTaskForm);