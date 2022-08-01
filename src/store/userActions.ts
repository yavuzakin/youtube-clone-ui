import { loginRequest, loginWithGoogleRequest, logoutRequest, registerRequest } from '../api/auth';
import { StatusType } from '../types/Common';
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
      const response = await loginRequest(username, password);
      if (response?.status === StatusType.SUCCESS) {
        dispatch(loginSuccess(response.data?.user!));
        setUsername('');
        setPassword('');
        navigate('/');
      } else {
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
      const response = await loginWithGoogleRequest(username, email, profilePic);
      if (response?.status === StatusType.SUCCESS) {
        dispatch(loginSuccess(response.data?.user!));
        navigate('/');
      } else {
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
      const response = await registerRequest(username, email, password);
      if (response?.status === StatusType.SUCCESS) {
        dispatch(loginSuccess(response.data?.user!));
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
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
      const response = await logoutRequest();
      if (response?.status === StatusType.SUCCESS) {
        dispatch(logoutUser());
      } else {
        dispatch(loginFailure());
      }
    };
    sendRequest();
  };
};
