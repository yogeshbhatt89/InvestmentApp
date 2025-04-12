import React, { useState } from 'react';
import { useRegister } from '../../services/auth/useRegister';
import { TextField, Button, CircularProgress } from '@mui/material';

const RegisterComponent = () => {
  const { register, isLoading, isError, snackbarOpen, backdropOpen } = useRegister();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call the register function from useRegister
      await register(userData);
    } catch (err) {
      // Error handling is managed in the useRegister hook
      console.error('Registration failed:', err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Full Name"
          name="fullName"
          value={userData.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </form>

      {/* Snackbar notification */}
      {snackbarOpen && (
        <div className={`snackbar ${snackbarOpen ? 'open' : ''}`}>
          {isError ? 'Registration failed!' : 'Registration successful!'}
        </div>
      )}

      {/* Backdrop or loading spinner */}
      {backdropOpen && (
        <div className="backdrop">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default RegisterComponent;
