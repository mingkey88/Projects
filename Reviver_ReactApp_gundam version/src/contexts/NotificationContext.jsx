import { createContext, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

// Create notification context
const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Show a notification
  const showNotification = (message, type = 'success', duration = 5000) => {
    const id = Date.now();
    
    // Add new notification
    setNotifications(prev => [...prev, { id, message, type }]);
    
    // Auto remove after duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, duration);
    
    return id;
  };
  
  // Remove a notification by id
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification, removeNotification }}>
      {children}
      
      {/* Render all active notifications */}
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          style={{ bottom: index * 80 + 20 }}
          autoHideDuration={6000}
          onClose={() => removeNotification(notification.id)}
        >
          <Alert 
            onClose={() => removeNotification(notification.id)} 
            severity={notification.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;