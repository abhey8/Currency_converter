import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const SuccessScreen = ({ onNavigate, paymentDetails }) => {
  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
    }}>
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}>
            <CheckCircle sx={{ 
              fontSize: 64,
              color: 'success.main',
            }} />
          </Box>

          <Typography variant="h4" sx={{ mb: 2 }}>
            Conversion Successful!
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
            Your conversion of {paymentDetails?.amount} {paymentDetails?.fromCurrency} to {paymentDetails?.convertedAmount} {paymentDetails?.toCurrency} has been completed.
          </Typography>

          <Box sx={{ 
            p: 2,
            mb: 4,
            bgcolor: 'rgba(66, 133, 244, 0.08)',
            borderRadius: '12px',
          }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Exchange Rate
            </Typography>
            <Typography variant="body1">
              1 {paymentDetails?.fromCurrency} = {paymentDetails?.exchangeRate} {paymentDetails?.toCurrency}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
              Fee (1.5%)
            </Typography>
            <Typography variant="body1">
              {paymentDetails?.fee} {paymentDetails?.toCurrency}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
              Total Amount
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {paymentDetails?.totalAmount} {paymentDetails?.toCurrency}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => onNavigate('home')}
            sx={{ py: 2 }}
          >
            Back to Home
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default SuccessScreen; 