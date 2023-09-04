import { createContext, useState } from 'react';
import NotificationsStack from '../components/Notifications/Stack';
import { generateUniqueId } from '../utils/id.util';

const NotificationsContext = createContext();

export default NotificationsContext;

export const NotificationsProvider = ({ children }) => {
	
	const [ notifications, setNotifications ] = useState([]);

	const pushNotification = (notification) => {
		setNotifications((prevNotifications) => {
			return [
				...prevNotifications,
				{
					id: generateUniqueId(),
					...notification,
				}
			];
		});
	};

	const removeNotification = (id) => {
		setNotifications((prevNotifications) => {
			return prevNotifications.filter((notification) => notification.id !== id);
		});
	};

	return (
		<NotificationsContext.Provider value={{
			notifications,
			push: pushNotification,
			remove: removeNotification,
		}}>
			<NotificationsStack />
			{ children }
		</NotificationsContext.Provider>
	);
};