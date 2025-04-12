import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import snackbarReducer from "../features/modules/snackbarSlice";
const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
