import React, { useState } from 'react';
import { useRegister } from '../../services/auth/useRegister';
import { TextField, Button, CircularProgress, Snackbar, Backdrop } from '@mui/material';

const RegisterComponent = () => {
  const { register, isLoading, isError, error } = useRegister();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackdropOpen(true); // Show the backdrop when starting the registration process
    try {
      // Call the register function from useRegister
      await register(userData);
      setSnackbarMessage('Registration successful!');
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage('Registration failed!');
      setSnackbarOpen(true);
    } finally {
      setBackdropOpen(false); // Hide the backdrop once done
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {/* Backdrop or loading spinner */}
      <Backdrop open={backdropOpen} style={{ zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default RegisterComponent;
