import { StatusType } from './Common';

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
  description: string;
  subscribedUsers: string[];
  subscribers: string[];
  updatedAt: Date;
  createdAt: Date;
  __v: number;
}

export interface UserQueryResponse {
  status: StatusType;
  data: {
    user: User;
    subscribedTo?: User;
    unSubscribedFrom?: User;
  } | null;
}

export interface AuthQueryResponse {
  status: StatusType;
  data: {
    user: User;
  };
}

export interface UserUpdateModel {
  profilePic?: string;
  description?: string;
}
