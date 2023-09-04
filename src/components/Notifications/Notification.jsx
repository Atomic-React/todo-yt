import { useContext, useEffect } from 'react';
import NotificationsContext from '../../contexts/notifications.context';

const Notification = ({ notification }) => {
	const { remove } = useContext(NotificationsContext);
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
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