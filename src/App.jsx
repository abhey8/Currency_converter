import React, { useState } from 'react';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import HomeScreen from './components/HomeScreen';
import ConvertScreen from './components/ConvertScreen';
import ConfirmScreen from './components/ConfirmScreen';
import SuccessScreen from './components/SuccessScreen';
import HistoryScreen from './components/HistoryScreen';

// Create theme using createTheme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4285F4',
      contrastText: '#fff',
    },
    background: {
      default: '#F8FAFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F1F1F',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontSize: '24px',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '16px',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 24px',
          boxShadow: 'none',
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: '64px',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#666666',
          '&.Mui-selected': {
            color: '#4285F4',
          },
        },
      },
    },
  },
});

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleNavigate = (screen, details = null) => {
    setCurrentScreen(screen);
    if (details) {
      setPaymentDetails(details);
      // Store conversion in history
      if (screen === 'confirm') {
        const history = JSON.parse(localStorage.getItem('conversionHistory') || '[]');
        history.unshift({
          ...details,
          timestamp: new Date().getTime()
        });
        // Keep only the last 50 conversions
        const limitedHistory = history.slice(0, 50);
        localStorage.setItem('conversionHistory', JSON.stringify(limitedHistory));
      }
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'convert':
        return <ConvertScreen onNavigate={handleNavigate} />;
      case 'confirm':
        return <ConfirmScreen onNavigate={handleNavigate} paymentDetails={paymentDetails} />;
      case 'success':
        return <SuccessScreen onNavigate={handleNavigate} paymentDetails={paymentDetails} />;
      case 'history':
        return <HistoryScreen onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        maxWidth: 500,
        mx: 'auto',
        bgcolor: 'background.default',
        minHeight: '100vh',
        boxShadow: { sm: '0px 0px 24px rgba(0, 0, 0, 0.1)' },
      }}>
        {renderScreen()}
      </Box>
    </ThemeProvider>
  );
};

export default App; 