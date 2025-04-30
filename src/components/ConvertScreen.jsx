import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  Switch,
  Paper,
  CircularProgress,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Select from 'react-select';

const currencies = [
  { value: 'INR', label: 'INR', subLabel: 'Indian Rupee', flag: '🇮🇳' },
  { value: 'USD', label: 'USD', subLabel: 'US Dollar', flag: '🇺🇸' },
  { value: 'EUR', label: 'EUR', subLabel: 'Euro', flag: '🇪🇺' },
  { value: 'GBP', label: 'GBP', subLabel: 'British Pound', flag: '🇬🇧' },
];

const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '12px',
    padding: '4px',
    border: '1px solid #E0E0E0',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #4285F4',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#4285F4' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: state.isSelected ? '#4285F4' : '#F5F5F5',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),
};

const ConvertScreen = ({ onNavigate }) => {
  const [amount, setAmount] = useState('10,000');
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [autoDetect, setAutoDetect] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateFee = (amount) => {
    if (amount) {
      const feeAmount = (parseFloat(amount) * 0.015).toFixed(2);
      setFee(feeAmount);
      return feeAmount;
    }
    return '0.00';
  };

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`
      );
      const data = await response.json();
      setExchangeRate(data.rates[toCurrency.value]);
      calculateConvertedAmount(data.rates[toCurrency.value]);
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again.');
      console.error('Error fetching exchange rates:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateConvertedAmount = (rate) => {
    const cleanAmount = parseFloat(amount.replace(/,/g, ''));
    if (!isNaN(cleanAmount) && rate) {
      const converted = cleanAmount * rate;
      const convertedAmountStr = converted.toFixed(2);
      setConvertedAmount(convertedAmountStr);
      calculateFee(convertedAmountStr);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency.value, toCurrency.value]);

  useEffect(() => {
    if (exchangeRate) {
      calculateConvertedAmount(exchangeRate);
    }
  }, [amount, exchangeRate]);

  const handleConvert = () => {
    if (convertedAmount) {
      onNavigate('confirm', {
        amount: convertedAmount,
        fromCurrency: fromCurrency.value,
        toCurrency: toCurrency.value,
        exchangeRate,
        fee: fee,
        totalAmount: (parseFloat(convertedAmount) + parseFloat(fee)).toFixed(2)
      });
    }
  };

  const formatOptionLabel = ({ label, subLabel, flag }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '20px' }}>{flag}</span>
      <div>
        <div style={{ fontWeight: 500 }}>{label}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{subLabel}</div>
      </div>
    </div>
  );

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
        <Typography variant="h4">Convert Currency</Typography>
      </Box>

      <Box sx={{ p: 2, flex: 1 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>
            Amount in {fromCurrency.value}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>
            From
          </Typography>
          <Select
            value={fromCurrency}
            onChange={setFromCurrency}
            options={currencies}
            styles={customSelectStyles}
            formatOptionLabel={formatOptionLabel}
            isSearchable={false}
            sx={{ mb: 3 }}
          />

          <Typography variant="body1" sx={{ mb: 1, color: '#666' }}>
            To
          </Typography>
          <Select
            value={toCurrency}
            onChange={setToCurrency}
            options={currencies}
            styles={customSelectStyles}
            formatOptionLabel={formatOptionLabel}
            isSearchable={false}
            sx={{ mb: 3 }}
          />

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 3,
          }}>
            <Typography>Auto-Detect Country</Typography>
            <Switch
              checked={autoDetect}
              onChange={(e) => setAutoDetect(e.target.checked)}
              color="primary"
            />
          </Box>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            p: 2,
            bgcolor: 'rgba(66, 133, 244, 0.08)',
            borderRadius: '12px',
          }}>
            {loading ? (
              <CircularProgress size={24} />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <>
                <Box>
                  <Typography>
                    1 {fromCurrency.value} = {exchangeRate?.toFixed(4)} {toCurrency.value}
                  </Typography>
                  {convertedAmount && (
                    <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                      Estimated fee (1.5%): {toCurrency.value} {fee}
                    </Typography>
                  )}
                </Box>
                {convertedAmount && (
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography>
                      {toCurrency.value} {convertedAmount}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                      Total: {toCurrency.value} {(parseFloat(convertedAmount) + parseFloat(fee)).toFixed(2)}
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleConvert}
            sx={{ py: 2 }}
            disabled={loading || !convertedAmount}
          >
            {loading ? 'Loading...' : 'Get Live Rate'}
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ConvertScreen; 