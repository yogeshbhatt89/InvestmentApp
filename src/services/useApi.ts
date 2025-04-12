import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setSnackbarMessage,
  setSnackbarSeverity,
} from "../features/modules/snackbarSlice";

// Type for API Error
type ApiError = {
  data?: {
    message: string;
  };
  status?: number;
};

// Generic useApi hook
export const useApi = <T, P>(
  apiHook: (params: P) => readonly [
    (params: P) => Promise<T>, // The mutate function
    { isLoading: boolean; isError: boolean; error?: ApiError | any } // Make error optional
  ],
  params: P
) => {
  const dispatch = useDispatch();
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Destructure the tuple returned from the apiHook
  const [mutate, { isLoading, isError, error }] = apiHook(params);

  // Function to call API with user data
  const callApi = async (userData: P) => {
    try {
      setBackdropOpen(true); // Show backdrop while loading
      const response = await mutate(userData); // Call the mutate function with params

      // Handle success: Show success snackbar
      dispatch(setSnackbarMessage("Operation successful"));
      dispatch(setSnackbarSeverity("success"));
      setSnackbarOpen(true);

      return response; // Return the data for further use if needed
    } catch (err) {
      // Error handling: Show message via snackbar
      const errorMessage =
        (err as ApiError)?.data?.message || "An unexpected error occurred"; // Safely access data.message
      dispatch(setSnackbarMessage(errorMessage));
      dispatch(setSnackbarSeverity("error"));
      setSnackbarOpen(true);
      throw err; // Propagate error if needed in the component
    } finally {
      setBackdropOpen(false); // Hide backdrop when done
    }
  };

  return {
    isLoading,
    isError,
    error, // Error can be undefined now
    backdropOpen,
    snackbarOpen,
    callApi, // Exposed to trigger the API call in components
  };
};
