import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'
import { formReducer } from '../modules/TextFieldComponent'
import { snackbarReducer } from '../modules/SnackbarComponent'

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    form: formReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
