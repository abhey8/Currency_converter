import React from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import {
  Home as HomeIcon,
  History as HistoryIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const recentTransactions = [
  {
    id: 1,
    amount: '$120.29',
    date: '04/22/24',
    data: [65, 70, 62, 68, 71, 69, 70],
  },
  {
    id: 2,
    amount: '£56.00',
    date: '04/20/24',
    data: [50, 53, 48, 52, 54, 53, 56],
  },
  {
    id: 3,
    amount: '£48.75',
    date: '04/18/24',
    data: [45, 47, 44, 46, 48, 47, 49],
  },
];

const HomeScreen = ({ onNavigate }) => {
  const [value, setValue] = React.useState(0);

  const handleNavigation = (newValue) => {
    setValue(newValue);
    if (newValue === 1) { // History tab
      onNavigate('history');
    } else if (newValue === 0) { // Home tab
      onNavigate('home');
    }
  };

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
    }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Home</Typography>
        <IconButton onClick={() => {}} sx={{ color: 'primary.main' }}>
          <SettingsIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Currency Converter
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
            Convert your currency with real-time exchange rates
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onNavigate('convert')}
            sx={{ py: 2 }}
          >
            Start Converting
          </Button>
        </Paper>
      </Box>

      <Box sx={{ p: 2, flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Transactions
        </Typography>

        {recentTransactions.map((transaction) => (
          <Paper
            key={transaction.id}
            sx={{
              p: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.02)' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {transaction.amount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {transaction.date}
              </Typography>
            </Box>
            <Box sx={{ width: 100, height: 40 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transaction.data.map(value => ({ value }))}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4285F4"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        ))}
      </Box>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="History" icon={<HistoryIcon />} />
        <BottomNavigationAction label="Charts" icon={<ChartIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default HomeScreen; 