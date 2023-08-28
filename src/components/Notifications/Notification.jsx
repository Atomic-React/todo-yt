import { useEffect } from 'react';
import { useNotifications } from '../../contexts/notifications.context';

const Notification = ({ notification }) => {
	const { remove } = useNotifications();
	const { id, type, message, dissmissDelay = 3000 } = notification;
	const handleClose = () => remove(id);

	useEffect(() => {
		if (!dissmissDelay) {
			return;
		}
		const timeout = setTimeout(() => {
			handleClose();
		}, 3000);

		return () => {
			clearTimeout(timeout);
		};
	}, [ dissmissDelay ]);

	return (
		<div className={`notification notification__${type}`}>
			<div className="notification-content">
				{message}
			</div>
			<button className="notification-close" onClick={handleClose}>
				&times;
			</button>
		</div>
	);
}

export default Notification;