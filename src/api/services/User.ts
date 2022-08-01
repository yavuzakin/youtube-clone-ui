import { UserQueryResponse } from '../../types/User';
import instance from '../axios';

export const getUser = async (id: string) => {
  try {
    const response = await instance.get<UserQueryResponse>(`users/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const subscribeToUser = async (userId: string) => {
  try {
    const response = await instance.put<UserQueryResponse>(`users/subscribe/${userId}`, {});
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const unSubscribeFromUser = async (userId: string) => {
  try {
    const response = await instance.put<UserQueryResponse>(`users/unsubscribe/${userId}`, {});
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
