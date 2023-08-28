import { createContext, useContext, useState } from 'react';
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
			pushNotification,
			removeNotification,
		}}>
			<NotificationsStack />
			{ children }
		</NotificationsContext.Provider>
	);
};

export const useNotifications = () => {
	const context = useContext(NotificationsContext);
	if (context === undefined) {
		throw new Error('useNotifications must be used within a NotificationsProvider');
	}

	const push = (notification) => {
		context.pushNotification(notification);
	};

	const remove = (id) => {
		context.removeNotification(id);
	};

	return {
		notifications: context.notifications,
		push,
		remove,
	};
};