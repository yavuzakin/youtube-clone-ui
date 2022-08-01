import axios from 'axios';
import type { AppDispatch } from './index';
import { loginFailure, loginStart, loginSuccess, logoutUser } from './userSlice';

interface NavigateFunction {
  (to: string, options?: { replace?: boolean; state?: any }): void;
  (delta: number): void;
}

export const login = (
  username: string,
  password: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      dispatch(loginStart());
      try {
        const response = await axios.post(
          'http://localhost:4132/api/v1/users/login',
          {
            username,
            password,
          },
          { withCredentials: true }
        );
        dispatch(loginSuccess(response.data.data.user));
        setUsername('');
        setPassword('');
        navigate('/');
      } catch (err) {
        dispatch(loginFailure());
      }
    };
    sendRequest();
  };
};

export const loginWithGoogle = (
  username: string,
  email: string,
  profilePic: string,
  navigate: NavigateFunction
) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      dispatch(loginStart());
      try {
        const response = await axios.post(
          'http://localhost:4132/api/v1/users/google-login',
          {
            username,
            email,
            password: process.env.REACT_APP_GOOGLE_PASSWORD,
            profilePic,
          },
          { withCredentials: true }
        );
        dispatch(loginSuccess(response.data.data.user));
        navigate('/');
      } catch (err) {
        dispatch(loginFailure());
      }
    };
    sendRequest();
  };
};

export const register = (
  username: string,
  email: string,
  password: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      dispatch(loginStart());
      try {
        const response = await axios.post(
          'http://localhost:4132/api/v1/users/register',
          {
            username,
            email,
            password,
          },
          { withCredentials: true }
        );
        dispatch(loginSuccess(response.data.data.user));
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/');
      } catch (err) {
        dispatch(loginFailure());
      }
    };
    sendRequest();
  };
};

export const logout = () => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      dispatch(loginStart());
      try {
        await axios('http://localhost:4132/api/v1/users/logout', {
          withCredentials: true,
        });
        dispatch(logoutUser());
      } catch (err) {
        dispatch(loginFailure());
      }
    };
    sendRequest();
  };
};
