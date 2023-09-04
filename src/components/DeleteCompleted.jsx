const DeleteCompleted = ({ onDeleteCompleted }) => {
	return (
		<button style={ { marginLeft: 'auto'} } type="button" onClick={ onDeleteCompleted('completed') }>
			Delete Completed
		</button>
	);
};

export default DeleteCompleted;