export interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePic: string;
  };
  video: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
