import './Notifications.css';

import NotificationsContext from '../../contexts/notifications.context';
import Notification from './Notification';
import { useContext } from 'react';

const NotificationsStack = () => {
	const { notifications } = useContext(NotificationsContext);

	return (
		<div className="notifications">
			{ notifications.map((notification) => (
				<Notification key={notification.id} notification={notification} />
			)) }
		</div>
	);
};

export default NotificationsStack;