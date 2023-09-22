import { Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

export const FilterBlock = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 8,
});

export const FilterBtn = styled(Button)(({ theme }) => ({
  height: 40,
  backgroundColor: 'transparent',
  color: theme.palette.primary.light,
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: 16,

  '&:hover': {
    backgroundColor: theme.palette.primary.dim,
    '.MuiButton-endIcon': {
      '.MuiSvgIcon-root': { color: theme.palette.primary.hot },
    },
  },
}));

export const IconClose = styled(CloseIcon)({
  fontSize: '1rem',
});


