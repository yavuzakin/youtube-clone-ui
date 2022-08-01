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
