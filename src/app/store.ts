import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'
import { inputFieldReducer } from '@/modules/TextField'
import { buttonReducer } from '@/modules/Button'
import { snackbarReducer } from '@/modules/Snackbar'
import { backdropReducer } from '@/modules/Backdrop'
export const store = configureStore({
  reducer: {
    textField: inputFieldReducer,
    button: buttonReducer,
    snackbar: snackbarReducer,
    backdrop: backdropReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
