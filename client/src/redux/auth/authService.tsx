import axios from "axios";
import {
  IForgotPassword,
  IGetMe,
  ILogin,
  IRegister,
  IResetPassword,
  IUpdatePassword,
  IUpdateUsername,
} from "./authSlice";

//Register user
export const register = async (userData: IRegister) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/register`,
    userData
  );

  if (response.data) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};
//Login user
export const login = async (userData: ILogin) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/login`,
    userData
  );

  if (response.data) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};
//Get user info
export const getMe = async ({ token }: IGetMe) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/me`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (response.data) {
  }

  return response.data;
};

//Forgot password
export const forgotPassword = async ({ email }: IForgotPassword) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/forgotPassword`,
    { email },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};
//Reset password
export const resetPassword = async ({ token, password }: IResetPassword) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/resetPassword`,
    {
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
//Update password
export const updatePassword = async ({
  token,
  password,
  newPassword,
}: IUpdatePassword) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/updatePassword`,
    {
      password,
      newPassword,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
//Update username
export const updateUsername = async ({ token, username }: IUpdateUsername) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_SERVER_PORT}/api/auth/updateUsername`,
    {
      username,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
