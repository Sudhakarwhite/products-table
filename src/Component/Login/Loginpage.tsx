import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Button, Container, Typography, Box, Alert, Avatar, Checkbox, FormControlLabel, Link, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../Redux/Loginreducer/reducer';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', data);
      dispatch(login(response.data));
      navigate('/products');
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            {...register('username')}
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{
              '& .MuiInputLabel-root': { transition: '0.3s' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
              '& .MuiInputBase-root': {
                transition: '0.3s',
                borderRadius: 1,
                '&:hover': { borderColor: 'primary.main' },
                '&.Mui-focused': { borderColor: 'primary.main' },
              },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              '& .MuiInputLabel-root': { transition: '0.3s' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
              '& .MuiInputBase-root': {
                transition: '0.3s',
                borderRadius: 1,
                '&:hover': { borderColor: 'primary.main' },
                '&.Mui-focused': { borderColor: 'primary.main' },
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{ mt: 1 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              transition: '0.3s',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.05)',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
      
    </Container>
  );
};

export default LoginPage;
