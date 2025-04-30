import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const HistoryScreen = ({ onNavigate }) => {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    // Load history from localStorage
    const storedHistory = localStorage.getItem('conversionHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
    }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => onNavigate('home')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Conversion History</Typography>
      </Box>

      <Box sx={{ p: 2, flex: 1, overflow: 'auto' }}>
        <Paper sx={{ p: 3 }}>
          {history.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', color: '#666' }}>
              No conversion history available
            </Typography>
          ) : (
            <List>
              {history.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                        {item.amount} {item.fromCurrency} → {item.convertedAmount} {item.toCurrency}
                      </Typography>
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Rate: 1 {item.fromCurrency} = {item.exchangeRate} {item.toCurrency}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Fee: {item.fee} {item.toCurrency}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total: {item.totalAmount} {item.toCurrency}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(item.timestamp)}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                  {index < history.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default HistoryScreen; 