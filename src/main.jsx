import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contexts/theme.context';
import { NotificationsProvider } from './contexts/notifications.context';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider>
		<NotificationsProvider>
			<App />
		</NotificationsProvider>
	</ThemeProvider>
)
