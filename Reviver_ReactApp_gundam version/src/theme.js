import { createTheme, alpha } from '@mui/material/styles';

// Define palette options for both modes
const getPalette = (mode) => ({
  mode,
  ...(mode === 'light'
    ? {
        // Light mode palette
        primary: {
          main: '#e91e63',
          light: '#f06292',
          dark: '#c2185b',
        },
        secondary: {
          main: '#9c27b0',
          light: '#ba68c8',
          dark: '#7b1fa2',
        },
        tertiary: {
          main: '#673ab7',
          light: '#9575cd',
          dark: '#512da8',
        },
        background: {
          default: '#f5f5f8',
          paper: '#ffffff',
          card: '#ffffff',
          cardHover: '#f0f0f5',
          tertiary: '#f8f8fa',
          elevation: {
            0: '#f5f5f8',
            1: '#ffffff',
            2: '#fafafa',
            3: '#f0f0f5',
          },
        },
        text: {
          primary: '#222222',
          secondary: '#555555',
          muted: '#777777',
        },
        border: {
          main: '#e0e0e0',
          light: '#eeeeee',
        },
      }
    : {
        // Dark mode palette (enhanced)
        primary: {
          main: '#e91e63',
          light: '#f06292',
          dark: '#c2185b',
        },
        secondary: {
          main: '#9c27b0',
          light: '#ba68c8',
          dark: '#7b1fa2',
        },
        tertiary: {
          main: '#673ab7',
          light: '#9575cd',
          dark: '#512da8',
        },
        background: {
          default: '#13111c',
          paper: '#1e1a2b',
          card: '#2a2438',
          cardHover: '#352d48',
          tertiary: '#201c2e',
          elevation: {
            0: '#13111c',
            1: '#1e1a2b',
            2: '#2a2438',
            3: '#352d48',
          },
        },
        text: {
          primary: '#ffffff',
          secondary: '#b8b5c0',
          muted: '#7a7786',
        },
        border: {
          main: '#352d48',
          light: '#473d5d',
        },
      }),
  success: {
    main: '#4caf50',
    light: '#81c784',
    dark: '#388e3c',
    contrastText: mode === 'dark' ? '#fff' : '#fff',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: mode === 'dark' ? '#fff' : '#fff',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: mode === 'dark' ? '#fff' : '#fff',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: mode === 'dark' ? '#fff' : '#fff',
  },
});

// Create a theme instance
const createAppTheme = (mode) => {
  const palette = getPalette(mode);
  
  return createTheme({
    palette,
    shape: {
      borderRadius: {
        sm: 6,
        md: 12,
        lg: 16,
      },
    },
    shadows: [
      'none',
      '0 2px 8px rgba(0, 0, 0, 0.15)',
      '0 4px 16px rgba(0, 0, 0, 0.2)',
      '0 8px 24px rgba(0, 0, 0, 0.25)',
      '0 12px 32px rgba(0, 0, 0, 0.3)',
      '0 16px 40px rgba(0, 0, 0, 0.35)',
      '0 20px 48px rgba(0, 0, 0, 0.4)',
      ...Array(17).fill('none'),
    ],
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.25,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.35,
      },
      h5: {
        fontSize: '1.1rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.45,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
        color: palette.text.muted,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            fontWeight: 500,
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: `0 4px 12px ${alpha(palette.primary.main, 0.3)}`,
              transform: 'translateY(-2px)',
            },
          },
          outlined: {
            borderColor: palette.border.main,
            '&:hover': {
              backgroundColor: alpha(palette.background.cardHover, 0.5),
            },
          },
          text: {
            '&:hover': {
              backgroundColor: alpha(palette.background.cardHover, 0.5),
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'all 0.2s ease-in-out',
          },
          elevation1: {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
          elevation2: {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          },
          elevation3: {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: palette.background.card,
            transition: 'all 0.3s ease',
            border: `1px solid ${alpha(palette.border.main, 0.3)}`,
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: `0 6px 20px ${alpha(palette.mode === 'dark' ? '#000000' : '#222222', 0.2)}`,
              borderColor: alpha(palette.primary.main, 0.2),
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontSize: '0.75rem',
            fontWeight: 500,
          },
          sizeSmall: {
            height: 24,
            fontSize: '0.7rem',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: alpha(palette.background.cardHover, 0.5),
            height: 8,
          },
          bar: {
            borderRadius: 8,
            backgroundImage: palette.mode === 'dark' 
              ? `linear-gradient(90deg, ${palette.primary.dark} 0%, ${palette.primary.main} 100%)`
              : `linear-gradient(90deg, ${palette.primary.main} 0%, ${palette.primary.light} 100%)`,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            border: `1px solid ${palette.border.main}`,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: `${palette.border.main} transparent`,
          },
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '*::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: palette.mode === 'dark' 
              ? alpha(palette.border.main, 0.8)
              : palette.border.main,
            borderRadius: '4px',
            transition: 'all 0.2s ease',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: palette.mode === 'dark'
              ? alpha(palette.primary.main, 0.6)
              : alpha(palette.primary.main, 0.3),
          },
          body: {
            backgroundColor: palette.background.default,
            color: palette.text.secondary,
            transition: 'all 0.3s ease-in-out',
            overflowX: 'hidden',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.background.paper,
            borderRight: `1px solid ${palette.border.main}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.background.paper,
            backgroundImage: 'none',
            borderRadius: 16,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });
};

// Export theme creation function
export { createAppTheme };

// Set default theme to dark mode
const theme = createAppTheme('dark');
export default theme;