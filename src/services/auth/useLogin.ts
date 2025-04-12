// // useLogin.ts
// import { useDispatch } from 'react-redux';
// import { setSnackbarMessage, setSnackbarSeverity } from '../features/modules/snackbarSlice';
// import { useApi } from './useApi';
// import { useLoginMutation } from '../services/api'; // Assuming you have a login mutation

// export const useLogin = () => {
//   const dispatch = useDispatch();
//   const { callApi, isLoading, isError, error, snackbarOpen, backdropOpen } = useApi(
//     useLoginMutation,
//     {}
//   );

//   const login = async (userData: { username: string; password: string }) => {
//     try {
//       await callApi(() => useLoginMutation(userData));
//       dispatch(setSnackbarMessage('Login successful!'));
//       dispatch(setSnackbarSeverity('success'));
//     } catch (err) {
//       dispatch(setSnackbarMessage('Login failed!'));
//       dispatch(setSnackbarSeverity('error'));
//     }
//   };

//   return {
//     login,
//     isLoading,
//     isError,
//     error,
//     snackbarOpen,
//     backdropOpen,
//   };
// };
