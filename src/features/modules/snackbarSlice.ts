import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  message: string;
  severity: "success" | "error" | "info" | "warning";
  open: boolean;
}

const initialState: SnackbarState = {
  message: "",
  severity: "info",
  open: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.open = true;
    },
    setSnackbarSeverity: (
      state,
      action: PayloadAction<"success" | "error" | "info" | "warning">
    ) => {
      state.severity = action.payload;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { setSnackbarMessage, setSnackbarSeverity, closeSnackbar } =
  snackbarSlice.actions;
export default snackbarSlice.reducer;
