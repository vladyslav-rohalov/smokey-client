import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

export const Column = styled(Box)({
  width: 'calc(70% / 4 - 40px)',
  '&:nth-of-type(2)': { width: '30%' },
  marginRight: '8px',
  '@media (max-width: 899px)': {
    width: '100%',
    marginRight: 0,
    marginBottom: '8px',
    '&:nth-of-type(2)': { width: '100%' },
  },
});

export const ColumnList = styled('ul')({ listStyle: 'none' });

export const ColumnTitle = styled(Typography)({
  color: '#fff',
  marginBottom: '8px',
  fontSize: '1.5rem',
});

export const ColumnText = styled(Typography)({
  color: '#fff',
  marginBottom: '4px',
});
