import { useDispatch } from "react-redux";
import {
  setSnackbarMessage,
  setSnackbarSeverity,
} from "../../app/modules/snackbarSlice";
import { useRegisterMutation } from "../api"; // Your RTK mutation

// Define the error type that matches what RTK Query can return
interface RegisterError {
  data?: { message: string };
  status?: number;
}

export const useRegister = () => {
  const dispatch = useDispatch();

  // Directly use the RTK mutation
  const [registerMutation, { isLoading, isError, error }] = useRegisterMutation();

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    fullName: string;
  }) => {
    try {
      await registerMutation(userData).unwrap(); // unwrap to catch errors properly

      dispatch(setSnackbarMessage("Registration successful!"));
      dispatch(setSnackbarSeverity("success"));
    } catch (err) {
      // Type casting error to RegisterError
      const errorResponse = err as RegisterError;
      const errorMessage =
        errorResponse?.data?.message || "Registration failed due to server error!";
      dispatch(setSnackbarMessage(errorMessage));
      dispatch(setSnackbarSeverity("error"));
    }
  };

  return {
    register,
    isLoading,
    isError,
    error,
  };
};
