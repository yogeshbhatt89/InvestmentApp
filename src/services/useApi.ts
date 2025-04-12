// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import {
//   setSnackbarMessage,
//   setSnackbarSeverity,
// } from "../app/modules/snackbarSlice";

// // Type for API Error
// type ApiError = {
//   data?: {
//     message: string;
//   };
//   status?: number;
// };

// export const useApi = <P>(
//   apiHook: () => ReturnType<typeof useRegisterMutation>
// ) => {
//   const dispatch = useDispatch();
//   const [backdropOpen, setBackdropOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   // Use the mutation hook
//   const [mutate, mutationResult] = apiHook();

//   const { isLoading, isError, error } = mutationResult;

//   const callApi = async (userData: P) => {
//     try {
//       setBackdropOpen(true);
//       const response = await mutate(userData).unwrap();

//       dispatch(setSnackbarMessage("Operation successful"));
//       dispatch(setSnackbarSeverity("success"));
//       setSnackbarOpen(true);

//       return response;
//     } catch (err) {
//       const errorMessage =
//         (err as any)?.data?.message || "An unexpected error occurred";
//       dispatch(setSnackbarMessage(errorMessage));
//       dispatch(setSnackbarSeverity("error"));
//       setSnackbarOpen(true);
//       throw err;
//     } finally {
//       setBackdropOpen(false);
//     }
//   };

//   return {
//     isLoading,
//     isError,
//     error,
//     backdropOpen,
//     snackbarOpen,
//     callApi,
//   };
// };
