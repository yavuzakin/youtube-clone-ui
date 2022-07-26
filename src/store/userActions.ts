import axios from 'axios';
import type { AppDispatch } from './index';
import { loginFailure, loginStart, loginSuccess } from './userSlice';

export const login = (username: string, password: string) => {
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
      } catch (err) {
        dispatch(loginFailure);
      }
    };
    sendRequest();
  };
};
