import './Notifications.css';

import { useNotifications } from '../../contexts/notifications.context';
import Notification from './Notification';

const NotificationsStack = () => {
	const { notifications } = useNotifications();

	return (
		<div className="notifications">
			{ notifications.map((notification) => (
				<Notification key={notification.id} notification={notification} />
			)) }
		</div>
	);
};

export default NotificationsStack;