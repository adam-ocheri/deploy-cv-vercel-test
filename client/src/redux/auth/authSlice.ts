import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from "./authService";

interface IUser {
  username: string;
  email: string;
  id: string;
}
interface IUserState {
  user: IUser | null;
  token: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
//Get user and token from localStorage
// let user = null;
// let token = null;
// localStorage is not defined on the window object, and Next.js performs a server render before the client render.

// if (typeof window !== "undefined" && typeof document !== "undefined") {
//   const token = localStorage.getItem("token");
// }
const initialState: IUserState = {
  user: null,
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export interface IRegister {
  email: string;
  username: string;
  password: string;
}
export const register = createAsyncThunk(
  "auth/register",
  async ({ email, username, password }: IRegister, thunkAPI) => {
    try {
      console.log("slice");
      const response = await authService.register({
        email,
        username,
        password,
      });

      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export interface ILogin {
  email: string;
  password: string;
}
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: ILogin, thunkAPI) => {
    try {
      const response = await authService.login({
        email,
        password,
      });

      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export interface IGetMe {
  token: string | null;
}
export const getMe = createAsyncThunk(
  "auth/getMe",
  async ({ token }: IGetMe, thunkAPI) => {
    try {
      const response = await authService.getMe({
        token,
      });
      console.log("response", response);

      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export interface IForgotPassword {
  email: string | null;
}
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: IForgotPassword, thunkAPI) => {
    try {
      const response = await authService.forgotPassword({
        email,
      });
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export interface IResetPassword {
  token: string | null;
  password: string | null;
}
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }: IResetPassword, thunkAPI) => {
    try {
      const response = await authService.resetPassword({
        token,
        password,
      });
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export interface IUpdatePassword {
  token: string | null;
  password: string | null;
  newPassword: string | null;
}
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ token, password, newPassword }: IUpdatePassword, thunkAPI) => {
    try {
      const response = await authService.updatePassword({
        token,
        password,
        newPassword,
      });
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export interface IUpdateUsername {
  token: string | null;
  username: string;
}
export const updateUsername = createAsyncThunk(
  "auth/updateUsername",
  async ({ token, username }: IUpdateUsername, thunkAPI) => {
    try {
      const response = await authService.updateUsername({
        token,
        username,
      });
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: IUserState) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    resetStatus: (state: IUserState) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    logout: (state: IUserState) => {
      console.log("logout in slice");
      // Reset state to initial and remove token from local storage
      Object.assign(state, initialState);
      localStorage.removeItem("token");
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      // TODO change name to verify token
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        localStorage.removeItem("token");
        state.message = action.payload as string;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Reset link was sent, please check your email";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message || "Password reset successful";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message as string;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      })
      .addCase(updateUsername.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message as string;
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload as string;
      });
  },
});

export const { logout, reset, resetStatus } = authSlice.actions;

export default authSlice.reducer;
