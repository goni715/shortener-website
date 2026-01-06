import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginError: "",
  registerError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    SetRegisterError: (state, action) => {
      state.registerError = action.payload;
    },
  },
});

export const { SetLoginError,
   SetRegisterError } = authSlice.actions;

const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
