import { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '../theme';

// Create the theme context
const ThemeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
});

// Custom hook to use the theme context
export const useThemeMode = () => useContext(ThemeContext);

// Theme provider component
export const ThemeModeProvider = ({ children }) => {
  // Get theme preference from localStorage or default to dark
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });

  // Create theme based on current mode
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  // Toggle theme function
  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Context value
  const contextValue = useMemo(() => ({
    mode,
    toggleTheme,
  }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeModeProvider;
