import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  loginError: string,
  registerError: string,
  verifyAccountOtpError: string
};

const initialState: TInitialState = {
  loginError: "",
  registerError: "",
  verifyAccountOtpError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetLoginError: (state, action: PayloadAction<string>) => {
      state.loginError = action.payload;
    },
    SetRegisterError: (state, action: PayloadAction<string>) => {
      state.registerError = action.payload;
    },
    SetVerifyAccountOtpError: (state, action: PayloadAction<string>) => {
      state.verifyAccountOtpError = action.payload;
    },
  },
});

export const { SetLoginError, SetRegisterError, SetVerifyAccountOtpError } = authSlice.actions;

const authSliceReducer = authSlice.reducer;
export default authSliceReducer;
