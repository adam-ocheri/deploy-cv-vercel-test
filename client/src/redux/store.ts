import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import profileSlice from "./profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
