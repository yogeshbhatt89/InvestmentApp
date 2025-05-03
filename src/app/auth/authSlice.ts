import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: { username: string } | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<{ username: string }>) => {
      state.user = action.payload
    },
  },
})

export const { register } = authSlice.actions
export default authSlice.reducer
