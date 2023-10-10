'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleAccount } from '../../redux/modal/slice';
import { register, logIn } from '../../redux/auth/operations';
import { useAuth } from '../../hooks/useAuth';
import { Box, Divider, Chip } from '@mui/material';
import Social from './social/social';
import Login from './login/login';
import Register from './register/register';

export default function Auth({ toggleAuth, login }) {
  const [showPassword, setShowPassword] = useState(false);

  const { user, error, isLogin } = useAuth();



  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = data => {
    dispatch(logIn(data));
    // console.log(isError);
    // dispatch(toggleAccount(false));
  };

  const handleRegister = data => {
    dispatch(register(data));
    dispatch(toggleAccount(false));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        height: '100%',
        overflowY: 'auto',
        py: { xs: 2, sm: 0 },
      }}
    >
      {login ? (
        <Login
          toggleAuth={toggleAuth}
          handleLogin={handleLogin}
          showPassword={showPassword}
          handleClick={handleClickShowPassword}
          httpError={error}
        />
      ) : (
        <Register
          toggleAuth={toggleAuth}
          handleRegister={handleRegister}
          showPassword={showPassword}
          handleClick={handleClickShowPassword}
        />
      )}

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          mx: 2,
          display: { xs: 'none', sm: 'flex' },
          color: 'primary.dim',
          '&::before, &::after': {
            borderColor: 'primary.dim',
          },
        }}
      >
        <Chip
          label="or"
          variant="outlined"
          sx={{ borderColor: 'primary.dim', color: 'primary.dim' }}
        />
      </Divider>
      <Social />
    </Box>
  );
}
