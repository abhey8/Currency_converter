import React from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const ConfirmScreen = ({ onNavigate, paymentDetails }) => {
  const handleConfirm = () => {
    onNavigate('success', paymentDetails);
  };

  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
    }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => onNavigate('convert')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4">Confirm Conversion</Typography>
      </Box>

      <Box sx={{ p: 2, flex: 1 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Conversion Details
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              You are converting
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {paymentDetails?.amount} {paymentDetails?.fromCurrency}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              To
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {paymentDetails?.convertedAmount} {paymentDetails?.toCurrency}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mb: 1,
            }}>
              <Typography variant="body2" color="text.secondary">
                Exchange Rate
              </Typography>
              <Typography variant="body2">
                1 {paymentDetails?.fromCurrency} = {paymentDetails?.exchangeRate} {paymentDetails?.toCurrency}
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mb: 1,
            }}>
              <Typography variant="body2" color="text.secondary">
                Fee (1.5%)
              </Typography>
              <Typography variant="body2">
                {paymentDetails?.fee} {paymentDetails?.toCurrency}
              </Typography>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 2,
            }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Total Amount
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {paymentDetails?.totalAmount} {paymentDetails?.toCurrency}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleConfirm}
            sx={{ py: 2 }}
          >
            Confirm Conversion
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ConfirmScreen; 