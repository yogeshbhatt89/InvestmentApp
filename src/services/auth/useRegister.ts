import { useDispatch } from "react-redux";
import {
  setSnackbarMessage,
  setSnackbarSeverity,
} from "../../features/modules/snackbarSlice";
import { useApi } from "../useApi";
import { useRegisterMutation } from "../api"; // Import your mutation hook from the API slice

export const useRegister = () => {
  const dispatch = useDispatch();

  // Use the useApi hook for the register API
  const { callApi, isLoading, isError, error, snackbarOpen, backdropOpen } =
    useApi(useRegisterMutation, {});

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    fullName: string;
  }) => {
    try {
      await callApi(userData);
      dispatch(setSnackbarMessage("Registration successful!"));
      dispatch(setSnackbarSeverity("success"));
    } catch (err) {
      dispatch(setSnackbarMessage("Registration failed!"));
      dispatch(setSnackbarSeverity("error"));
    }
  };

  return {
    register,
    isLoading,
    isError,
    error,
    snackbarOpen,
    backdropOpen,
  };
};
