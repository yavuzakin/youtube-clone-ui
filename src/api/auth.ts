import { AuthQueryResponse } from '../types/User';
import instance from './axios';

export const loginRequest = async (username: string, password: string) => {
  try {
    const response = await instance.post<AuthQueryResponse>('users/login', {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginWithGoogleRequest = async (
  username: string,
  email: string,
  profilePic: string
) => {
  try {
    const response = await instance.post<AuthQueryResponse>('users/google-login', {
      username,
      email,
      password: process.env.REACT_APP_GOOGLE_PASSWORD,
      profilePic,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const registerRequest = async (username: string, email: string, password: string) => {
  try {
    const response = await instance.post<AuthQueryResponse>('users/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const logoutRequest = async () => {
  try {
    const response = await instance.get<{ status: string }>('users/logout');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
